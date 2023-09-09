# URL Advisor Documentation

A chrome extension to detect potentially malicous URLs and alert the user of such URL,

## Prerequisite

* Clone this repository:

```bash
git clone https://github.com/ritalamykin/gcp-url-analyzer.git <target path>
```

## Features

* **Extension**: Defines the chrome extension and content scripts
* **Dockerfile**: Container build instructions, if needed to replace buildpack for custom build
* **Service metadata**: Access service metadata, project ID and region, at runtime
* **Local development utilities**: Auto-restart with changes and prettify logs
* **Structured logging w/ Log Correlation** JSON formatted logger, parsable by Cloud Logging, with [automatic correlation of container logs to a request log](https://cloud.google.com/run/docs/logging#correlate-logs).
* **Unit and System tests**: Basic unit and system tests setup for the microservice
* **Server application**: `app.py` manages client requests, loads the url-analyzer model and classifies each input url as malicous or benign.

## Future Henancements
* **WAF**: Web application firewall, in order to protect the user's privacy.
* **Load Balancer**: Set up a load balancer, to improve performance.

## Contributions

Trained model and prediction is based on https://github.com/VaibhavBichave/Phishing-URL-Detection.git
