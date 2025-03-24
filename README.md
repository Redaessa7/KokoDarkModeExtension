# KOKO - Dark Mode

A sleek and stylish browser extension that applies a dark mode theme to [programmingadvices.com](https://programmingadvices.com/). Enhance your browsing experience with a modern dark aesthetic tailored for developers and night owls alike.

## Features
- Applies a custom dark mode theme to programmingadvices.com.
- Lightweight and easy to use.
- Toggleable via a browser popup (coming soon with further development).

## Installation

### From Source (Development Mode)
To use or test the extension in development mode, follow these steps:

1. **Download the Files**  
   - Clone this repository or download the ZIP file and extract it to a folder on your computer.

2. **Open Your Browser**  
   - This extension is compatible with Chromium-based browsers like Google Chrome or Microsoft Edge.

3. **Enable Developer Mode**  
   - Open your browser and navigate to the Extensions page:
     - Chrome: `chrome://extensions/`
     - Edge: `edge://extensions/`
   - Toggle the **Developer Mode** switch (usually in the top-right corner) to ON.

4. **Load the Extension**  
   - Click **Load Unpacked** (or similar option depending on your browser).
   - Select the folder containing the extension files (the folder with `manifest.json`).
   - The extension should now appear in your browser's extension list.

5. **Test It Out**  
   - Visit [programmingadvices.com](https://programmingadvices.com/), and the dark mode theme will automatically apply!


## Manifest Details
- **Version**: 3 (Uses Manifest V3, the latest standard for browser extensions).
- **Permissions**:
  - `activeTab`: Access the active tab to apply changes.
  - `scripting`: Inject scripts into matched pages.
  - `storage`: Store user preferences (if implemented).
- **Content Scripts**: Applies `darkmode.css` and `content.js` to all pages under `https://programmingadvices.com/*`.
- **Icons**: Custom icons in various sizes for a polished look.

## How It Works
- The extension injects the `darkmode.css` stylesheet into matching pages at `document_start`, ensuring the dark theme loads immediately.
- The `content.js` file can be extended to add interactivity or additional logic.
- A popup interface (`popup.html`) is included for future enhancements, such as toggling the dark mode on/off.

## Development
To modify or enhance the extension:
1. Edit the files in the respective folders (e.g., update `darkmode.css` for styling changes).
2. Reload the extension in the browser:
   - Go to the Extensions page (`chrome://extensions/`).
   - Click the **Refresh** button on the "KOKO - Dark Mode" extension card.
3. Test your changes by visiting [programmingadvices.com](https://programmingadvices.com/).

## Contributing
Feel free to fork this repository, make improvements, and submit a pull request. Suggestions for new features or bug fixes are welcome!

## License
This project is open-source and available under the [MIT License](LICENSE).
