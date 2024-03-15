# Image Processing Application

This is a React application for image processing. It allows users to upload images, perform various operations on them, download the modified images, and save the original images.

## Installation

To run this application locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using npm: `npm install`
4. Start the development server: `npm start`

## Usage

Once the development server is running, you can access the application in your web browser. Upload an image using the provided interface, and then you can perform the following actions:

- **Download**: Download the current image after modifications.
- **Reset**: Reset the image to its original state.
- **Save Original**: Save the original image.
- **Perform Operations**: Various image operations can be performed using the sidebar interface.

# Image Processing Operations

This document outlines all the supported image processing operations available in the application. Each operation is represented by an icon in the grid, and clicking on an icon triggers the corresponding operation on the uploaded image.

## Supported Operations

### 1. Generate Color Components
- **Red Component**: Generates the red component of the image.
- **Green Component**: Generates the green component of the image.
- **Blue Component**: Generates the blue component of the image.

### 2. Image Filtering
- **Blur Image**: Applies a blur filter to the image.
- **Sharpen Image**: Sharpens the image.
- **Greyscale Filter**: Converts the image to greyscale.
- **Sepia Filter**: Applies a sepia tone filter to the image.
- **Color Correct Image**: Performs color correction on the image.

### 3. Brightness Adjustment
- **Brighten Image**: Increases the brightness of the image by a specified factor.
- **Darken Image**: Decreases the brightness of the image by a specified factor.

### 4. Image Compression
- **Compress Image**: Compresses the image by reducing its quality.

### 5. Color Space Operations
- **Luma Component Image**: Extracts the luma component of the image.
- **Value Component Image**: Extracts the value component of the image.
- **Intensity Component Image**: Extracts the intensity component of the image.

### 6. Adjust Color Levels
- **Adjust Levels**: Allows adjustment of color levels in the image. Three sliders are provided for adjusting black, mid, and white levels.

### 7. Image Flipping
- **Flip Vertically**: Flips the image vertically.
- **Flip Horizontally**: Flips the image horizontally.

## Usage

To apply an operation to an image, click on the corresponding icon in the grid. Some operations may require additional input, such as brightness adjustment or color level adjustment. In such cases, a popup will appear allowing the user to specify the parameters before applying the operation.

## Notes

- The application provides a visual representation of each operation using icons for better user experience.
- Users can preview the effect of each operation before applying it to the image.

## Technologies Used

- React
- Axios
- HTML Canvas

## File Structure

- `App.js`: Main application component containing the image processing logic.
- `components/`: Directory containing reusable React components for the header, sidebar, and image panel.
- `ApiConfig.js`: Configuration file containing API base URL and endpoints.

## Additional Information

For any queries or feedback, please contact the developers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

