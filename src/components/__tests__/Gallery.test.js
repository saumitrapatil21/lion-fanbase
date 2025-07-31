import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Gallery from '../Gallery';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');
global.URL.revokeObjectURL = jest.fn();

// Mock file for testing
const createMockFile = (name = 'test-lion.jpg', type = 'image/jpeg') => {
  const file = new File(['test content'], name, { type });
  return file;
};

describe('Gallery Upload Functionality', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any created object URLs
    global.URL.createObjectURL.mockClear();
    global.URL.revokeObjectURL.mockClear();
  });

  describe('Upload Section Rendering', () => {
    test('renders upload section with correct title', () => {
      render(<Gallery />);
      
      expect(screen.getByText('📤 Upload Your Lion Photos! 🦁')).toBeInTheDocument();
    });

    test('renders upload area with correct content', () => {
      render(<Gallery />);
      
      expect(screen.getByText('📱 ➡️ 🖼️')).toBeInTheDocument();
      expect(screen.getByText('👆 Click or drag photos here! 👆')).toBeInTheDocument();
      expect(screen.getByText('🦁 📷 🌟 🎉')).toBeInTheDocument();
    });

    test('renders hidden file input', () => {
      render(<Gallery />);
      
      const fileInput = screen.getByRole('button', { hidden: true });
      expect(fileInput).toHaveAttribute('type', 'file');
      expect(fileInput).toHaveAttribute('accept', 'image/*');
      expect(fileInput).toHaveAttribute('multiple');
    });

    test('upload section appears after gallery images', () => {
      render(<Gallery />);
      
      const uploadSection = screen.getByText('📤 Upload Your Lion Photos! 🦁').closest('.gallery__upload-section');
      const galleryGrid = document.querySelector('.gallery__grid');
      
      expect(uploadSection).toBeInTheDocument();
      expect(galleryGrid).toBeInTheDocument();
      
      // Check that upload section comes after gallery grid in DOM order
      const container = uploadSection.parentElement;
      const children = Array.from(container.children);
      const uploadIndex = children.indexOf(uploadSection);
      const gridIndex = children.indexOf(galleryGrid);
      
      expect(uploadIndex).toBeGreaterThan(gridIndex);
    });
  });

  describe('File Upload via Click', () => {
    test('opens file dialog when upload area is clicked', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      // Mock the file input click
      const fileInput = screen.getByRole('button', { hidden: true });
      const clickSpy = jest.spyOn(fileInput, 'click');
      
      await user.click(uploadArea);
      
      expect(clickSpy).toHaveBeenCalled();
    });

    test('handles single file upload', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('lion1.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
    });

    test('handles multiple file upload', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const files = [
        createMockFile('lion1.jpg'),
        createMockFile('lion2.png', 'image/png'),
        createMockFile('lion3.gif', 'image/gif')
      ];
      
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, files);
      
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(3);
    });

    test('shows success message temporarily', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      // Success message should appear
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      // Success message should disappear after 3 seconds
      await waitFor(() => {
        expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
      }, { timeout: 4000 });
    });
  });

  describe('Drag and Drop Upload', () => {
    test('handles drag enter event', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      fireEvent.dragEnter(uploadArea, {
        dataTransfer: {
          files: [createMockFile('lion.jpg')]
        }
      });
      
      expect(uploadArea).toHaveClass('gallery__upload-area--active');
    });

    test('handles drag over event', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      fireEvent.dragOver(uploadArea, {
        dataTransfer: {
          files: [createMockFile('lion.jpg')]
        }
      });
      
      expect(uploadArea).toHaveClass('gallery__upload-area--active');
    });

    test('handles drag leave event', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      // First activate drag
      fireEvent.dragEnter(uploadArea);
      expect(uploadArea).toHaveClass('gallery__upload-area--active');
      
      // Then leave
      fireEvent.dragLeave(uploadArea);
      expect(uploadArea).not.toHaveClass('gallery__upload-area--active');
    });

    test('handles file drop', async () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      const file = createMockFile('dropped-lion.jpg');
      
      fireEvent.drop(uploadArea, {
        dataTransfer: {
          files: [file]
        }
      });
      
      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });
      
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
      expect(uploadArea).not.toHaveClass('gallery__upload-area--active');
    });

    test('prevents default behavior on drag events', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      const dragEnterEvent = new Event('dragenter', { bubbles: true });
      const dragOverEvent = new Event('dragover', { bubbles: true });
      const dropEvent = new Event('drop', { bubbles: true });
      
      const preventDefaultSpy = jest.spyOn(dragEnterEvent, 'preventDefault');
      
      fireEvent(uploadArea, dragEnterEvent);
      fireEvent(uploadArea, dragOverEvent);
      fireEvent(uploadArea, dropEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Uploaded Images Display', () => {
    test('displays uploaded images in gallery grid', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('test-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        const uploadedImage = screen.getByAltText('Uploaded lion photo: test-lion.jpg');
        expect(uploadedImage).toBeInTheDocument();
        expect(uploadedImage).toHaveAttribute('src', 'mocked-url');
      });
    });

    test('shows remove button on uploaded images', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('test-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        const removeButton = screen.getByLabelText('Remove uploaded image');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton).toHaveTextContent('❌');
      });
    });

    test('removes uploaded image when remove button is clicked', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('test-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        expect(screen.getByAltText('Uploaded lion photo: test-lion.jpg')).toBeInTheDocument();
      });
      
      const removeButton = screen.getByLabelText('Remove uploaded image');
      await user.click(removeButton);
      
      await waitFor(() => {
        expect(screen.queryByAltText('Uploaded lion photo: test-lion.jpg')).not.toBeInTheDocument();
      });
    });
  });

  describe('Gallery Filters with Uploaded Images', () => {
    test('includes "My Photos" filter when images are uploaded', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      // Initially no "My Photos" filter
      expect(screen.queryByText('📤 My Photos')).not.toBeInTheDocument();
      
      const file = createMockFile('test-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        expect(screen.getByText('📤 My Photos')).toBeInTheDocument();
      });
    });

    test('shows correct count in "My Photos" filter', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const files = [
        createMockFile('lion1.jpg'),
        createMockFile('lion2.jpg')
      ];
      
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, files);
      
      await waitFor(() => {
        const myPhotosFilter = screen.getByText('📤 My Photos');
        expect(myPhotosFilter.parentElement).toHaveTextContent('2');
      });
    });

    test('filters to show only uploaded images when "My Photos" is selected', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      const file = createMockFile('my-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });
      
      await user.upload(fileInput, file);
      
      await waitFor(() => {
        const myPhotosFilter = screen.getByText('📤 My Photos');
        expect(myPhotosFilter).toBeInTheDocument();
      });
      
      const myPhotosButton = screen.getByText('📤 My Photos').closest('button');
      await user.click(myPhotosButton);
      
      await waitFor(() => {
        expect(screen.getByAltText('Uploaded lion photo: my-lion.jpg')).toBeInTheDocument();
        // Original gallery images should not be visible
        expect(screen.queryByAltText(/Male lion with magnificent mane/)).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles empty file list gracefully', () => {
      render(<Gallery />);
      
      const uploadArea = screen.getByText('👆 Click or drag photos here! 👆').closest('.gallery__upload-area');
      
      fireEvent.drop(uploadArea, {
        dataTransfer: {
          files: []
        }
      });
      
      // Should not show success message
      expect(screen.queryByText('🎉 YAY! Photo uploaded! 🎉')).not.toBeInTheDocument();
    });

    test('handles invalid file types gracefully', async () => {
      const user = userEvent.setup();
      render(<Gallery />);
      
      // Create a non-image file
      const textFile = new File(['text content'], 'document.txt', { type: 'text/plain' });
      const fileInput = screen.getByRole('button', { hidden: true });
      
      // The file input has accept="image/*" so this should be handled by the browser
      // But we can test that our code doesn't break
      await user.upload(fileInput, textFile);
      
      // The component should still function normally
      expect(screen.getByText('📤 Upload Your Lion Photos! 🦁')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('upload area has proper accessibility attributes', () => {
      render(<Gallery />);

      const fileInput = screen.getByRole('button', { hidden: true });
      expect(fileInput).toHaveAttribute('accept', 'image/*');
      expect(fileInput).toHaveAttribute('multiple');
    });

    test('remove button has proper aria-label', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      const file = createMockFile('test-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });

      await user.upload(fileInput, file);

      await waitFor(() => {
        const removeButton = screen.getByLabelText('Remove uploaded image');
        expect(removeButton).toBeInTheDocument();
      });
    });
  });

  describe('Integration with Lightbox', () => {
    test('uploaded images can be opened in lightbox', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      const file = createMockFile('lightbox-test.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });

      await user.upload(fileInput, file);

      await waitFor(() => {
        const uploadedImage = screen.getByAltText('Uploaded lion photo: lightbox-test.jpg');
        expect(uploadedImage).toBeInTheDocument();
      });

      const uploadedImage = screen.getByAltText('Uploaded lion photo: lightbox-test.jpg');
      await user.click(uploadedImage);

      await waitFor(() => {
        expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
      });
    });

    test('lightbox shows correct information for uploaded images', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      const file = createMockFile('my-awesome-lion.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });

      await user.upload(fileInput, file);

      await waitFor(() => {
        const uploadedImage = screen.getByAltText('Uploaded lion photo: my-awesome-lion.jpg');
        expect(uploadedImage).toBeInTheDocument();
      });

      const uploadedImage = screen.getByAltText('Uploaded lion photo: my-awesome-lion.jpg');
      await user.click(uploadedImage);

      await waitFor(() => {
        expect(screen.getByText('my-awesome-lion.jpg')).toBeInTheDocument();
        expect(screen.getByText('Your uploaded lion photo!')).toBeInTheDocument();
      });
    });
  });

  describe('Performance and Memory Management', () => {
    test('creates object URLs for uploaded files', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      const file = createMockFile('performance-test.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });

      await user.upload(fileInput, file);

      expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
    });

    test('handles large number of file uploads', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      // Create 10 files
      const files = Array.from({ length: 10 }, (_, i) =>
        createMockFile(`lion-${i + 1}.jpg`)
      );

      const fileInput = screen.getByRole('button', { hidden: true });

      await user.upload(fileInput, files);

      await waitFor(() => {
        expect(screen.getByText('🎉 YAY! Photo uploaded! 🎉')).toBeInTheDocument();
      });

      expect(global.URL.createObjectURL).toHaveBeenCalledTimes(10);

      // Check that all images are displayed
      files.forEach((file, index) => {
        expect(screen.getByAltText(`Uploaded lion photo: lion-${index + 1}.jpg`)).toBeInTheDocument();
      });
    });
  });

  describe('State Management', () => {
    test('maintains uploaded images state across filter changes', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      const file = createMockFile('state-test.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });

      await user.upload(fileInput, file);

      await waitFor(() => {
        expect(screen.getByAltText('Uploaded lion photo: state-test.jpg')).toBeInTheDocument();
      });

      // Switch to different filter
      const maleFilter = screen.getByText('👑 Boys').closest('button');
      await user.click(maleFilter);

      // Switch back to all
      const allFilter = screen.getByText('🌟 All').closest('button');
      await user.click(allFilter);

      // Uploaded image should still be there
      await waitFor(() => {
        expect(screen.getByAltText('Uploaded lion photo: state-test.jpg')).toBeInTheDocument();
      });
    });

    test('updates filter counts when images are uploaded and removed', async () => {
      const user = userEvent.setup();
      render(<Gallery />);

      const file = createMockFile('count-test.jpg');
      const fileInput = screen.getByRole('button', { hidden: true });

      // Upload file
      await user.upload(fileInput, file);

      await waitFor(() => {
        const allFilter = screen.getByText('🌟 All');
        const myPhotosFilter = screen.getByText('📤 My Photos');

        // Check counts are updated
        expect(allFilter.parentElement).toHaveTextContent('5'); // 4 original + 1 uploaded
        expect(myPhotosFilter.parentElement).toHaveTextContent('1');
      });

      // Remove the uploaded image
      const removeButton = screen.getByLabelText('Remove uploaded image');
      await user.click(removeButton);

      await waitFor(() => {
        const allFilter = screen.getByText('🌟 All');
        expect(allFilter.parentElement).toHaveTextContent('4'); // Back to original count
        expect(screen.queryByText('📤 My Photos')).not.toBeInTheDocument();
      });
    });
  });
});
