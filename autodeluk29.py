import sys
import logging
import json
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QMessageBox

# Set up logging
logging.basicConfig(filename='app.log', level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Load configuration
try:
    with open('config.json', 'r') as config_file:
        config = json.load(config_file)
except Exception as e:
    logging.error(f'Error loading configuration: {e}')
    config = {}

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(config.get('title', 'My PyQt5 App'))
        self.setGeometry(100, 100, 800, 600)
        self.init_ui()

    def init_ui(self):
        button = QPushButton('Click Me', self)
        button.clicked.connect(self.on_button_click)
        button.resize(100, 50)
        button.move(350, 275)

    def on_button_click(self):
        try:
            QMessageBox.information(self, 'Message', 'Button clicked!')
            logging.info('Button clicked successfully.')
        except Exception as e:
            logging.error(f'Error on button click: {e}')
            QMessageBox.critical(self, 'Error', 'An error occurred!')

if __name__ == '__main__':
    app = QApplication(sys.argv)
    mainWin = MainWindow()
    mainWin.show()
    try:
        sys.exit(app.exec_())
    except Exception as e:
        logging.critical(f'Critical error: {e}')
