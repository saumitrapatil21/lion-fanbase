import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Gallery from '../Gallery';

// Mock URL.createObjectURL and revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-object-url');
global.URL.revokeObjectURL = jest.fn();

// Helper function to create mock files
const createMockFile = (name, type = 'image/jpeg', size = 1024) => {
  const file = new File(['mock content'], name, { type, size });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// Helper function to create drag event
const createDragEvent = (type, files = []) => {
  const event = new Event(type, { bubbles: true });
  Object.defineProperty(event, 'dataTransfer', {
    value: {
      files,
      types: ['Files']
    }
  });
  return event;
};

describe('Upload Functionality Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('File Validation', () => {
    test('accepts valid image file types', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const validFiles = [
        createMockFile('test.jpg', 'image/jpeg'),
        createMockFile('test.png', 'image/png'),
        createMockFile('test.gif', 'image/gif'),
        createMockFile('test.webp', 'image/webp'),
        createMockFile('test.bmp', 'image/bmp')
      ];
      
      const fileInput = screen.getByRole('button', { hidden: true });
      
      for (const file of validFiles) {
        await user.upload(fileInput, file);
        
        await waitFor(() => {
          expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
        });
        
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
        
        // Clear success message for next test
        await waitFor(() => {
          expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
        }, { timeout: 4000 });
      }
    });

    test('handles files with special characters in names', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const specialFiles = [
        createMockFile('lion-photo_2023.jpg'),
        createMockFile('my lion (1).png'),
        createMockFile('lion@home.jpeg'),
        createMockFile('lion#1.gif'),
        createMockFile('lion & cubs.webp')
      ];
      
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, specialFiles);
      
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      // Check that all files were processed
      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(5);
    });
  });

  describe('Drag and Drop Events', () => {
    test('handles dragenter event correctly', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      const file = createMockFile('drag-test.jpg');
      
      const dragEnterEvent = createDragEvent('dragenter', [file]);
      fireEvent(uploadArea, dragEnterEvent);
      
      expect(uploadArea).toHaveClass('gallery__upload-area--active');
    });

    test('handles dragover event correctly', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      const file = createMockFile('drag-test.jpg');
      
      const dragOverEvent = createDragEvent('dragover', [file]);
      fireEvent(uploadArea, dragOverEvent);
      
      expect(uploadArea).toHaveClass('gallery__upload-area--active');
    });

    test('handles dragleave event correctly', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      // First enter drag state
      const dragEnterEvent = createDragEvent('dragenter');
      fireEvent(uploadArea, dragEnterEvent);
      expect(uploadArea).toHaveClass('gallery__upload-area--active');
      
      // Then leave drag state
      const dragLeaveEvent = createDragEvent('dragleave');
      fireEvent(uploadArea, dragLeaveEvent);
      expect(uploadArea).not.toHaveClass('gallery__upload-area--active');
    });

    test('handles drop event with files', async () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      const files = [
        createMockFile('dropped1.jpg'),
        createMockFile('dropped2.png')
      ];
      
      const dropEvent = createDragEvent('drop', files);
      fireEvent(uploadArea, dropEvent);
      
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(2);
      expect(uploadArea).not.toHaveClass('gallery__upload-area--active');
    });

    test('prevents default behavior on all drag events', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
      
      events.forEach(eventType => {
        const event = createDragEvent(eventType);
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
        
        fireEvent(uploadArea, event);
        
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(stopPropagationSpy).toHaveBeenCalled();
      });
    });
  });

  describe('File Processing', () => {
    test('generates unique IDs for uploaded files', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const files = [
        createMockFile('file1.jpg'),
        createMockFile('file2.jpg')
      ];
      
      const fileInput = screen.getByRole('button', { hidden: true });
      
      // Mock Date.now to return predictable values
      const originalDateNow = Date.now;
      let mockTime = 1000000;
      Date.now = jest.fn(() => mockTime++);
      
      // Mock Math.random to return predictable values
      const originalMathRandom = Math.random;
      let mockRandom = 0.1;
      Math.random = jest.fn(() => mockRandom += 0.1);
      
      await user.upload(fileInput, files);
      
      await waitFor(() => {
        expect(screen.getByAltText('Uploaded lion photo: file1.jpg')).toBeInTheDocument();
        expect(screen.getByAltText('Uploaded lion photo: file2.jpg')).toBeInTheDocument();
      });
      
      // Restore original functions
      Date.now = originalDateNow;
      Math.random = originalMathRandom;
    });

    test('creates correct image objects with all required properties', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('test-properties.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        const uploadedImage = screen.getByAltText('Uploaded lion photo: test-properties.jpg');
        expect(uploadedImage).toBeInTheDocument();
        expect(uploadedImage).toHaveAttribute('src', 'mocked-object-url');
      });
      
      // Check that the image has the uploaded category
      const myPhotosFilter = screen.getByText('📤 My Photos');
      await user.click(myPhotosFilter.closest('button'));
      
      await waitFor(() => {
        expect(screen.getByAltText('Uploaded lion photo: test-properties.jpg')).toBeInTheDocument();
      });
    });
  });

  describe('Success Message Behavior', () => {
    test('shows success message immediately after upload', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('immediate-success.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      // Success message should appear immediately
      expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
    });

    test('hides success message after timeout', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('timeout-test.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      // Success message should appear
      expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      
      // Wait for timeout (3 seconds)
      await waitFor(() => {
        expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
      }, { timeout: 4000 });
    });

    test('shows success message for multiple uploads', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const fileInput = screen.getByRole('button', { hidden: true });
      
      // First upload
      await user.upload(fileInput, createMockFile('first.jpg'));
      expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      
      // Wait for message to disappear
      await waitFor(() => {
        expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
      }, { timeout: 4000 });
      
      // Second upload
      await user.upload(fileInput, createMockFile('second.jpg'));
      expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty file selection gracefully', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      // Drop event with no files
      const dropEvent = createDragEvent('drop', []);
      fireEvent(uploadArea, dropEvent);
      
      // Should not show success message
      expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
    });

    test('handles null/undefined file inputs', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      // Drop event with null files
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: { files: null }
      });
      
      fireEvent(uploadArea, dropEvent);
      
      // Should not crash or show success message
      expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
    });

    test('handles very large file names', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const longFileName = 'a'.repeat(255) + '.jpg';
      const file = createMockFile(longFileName);
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
    });
  });
});
