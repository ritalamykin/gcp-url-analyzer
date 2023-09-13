# URL Advisor Documentation

A chrome extension to detect potentially malicous URLs and alert the user of such URL.

## Prerequisite

* Clone this repository:

```bash
git clone https://github.com/ritalamykin/gcp-url-analyzer.git <target path>
```
* Setup gcp-url-analyzer/extension directory as a new extension in chrome

## Features

* **Extension**: Defines the chrome extension and content scripts
* **Dockerfile**: Container build instructions with requirements installation and gunicorn configurations.
* **Server application**: `app.py` manages client requests, loads the url-analyzer model and classifies each input url as malicous or benign.

## URL Advisor article:

## References
* Trained model and prediction is based on https://github.com/VaibhavBichave/Phishing-URL-Detection.git
