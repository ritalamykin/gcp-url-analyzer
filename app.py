# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import signal
import sys
from types import FrameType
from multiprocessing import Pool

from utils.logging import logger
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn import metrics 
import warnings
import pickle
import os
warnings.filterwarnings('ignore')
from feature import FeatureExtraction

file = open("pickle/model.pkl","rb")
gbc = pickle.load(file)
file.close()

THREAD_NUMBER = 10
RUN_CONCURRENTLY = True

app = Flask(__name__)

def predict(url):
    obj = FeatureExtraction(url)

    x = np.array(obj.getFeaturesList()).reshape(1,30) 
    y_pred = gbc.predict(x)[0]
    #1 is safe       
    #-1 is unsafe
    return {url: str(y_pred)}


@app.route("/", methods=["POST"])
def index():
    if request.method == "POST":
        data = request.get_json(force=True)
        urls = data['urls']
        urls = list(set(urls))
        url_to_prediction = {}

        # Using multi-thread
        if RUN_CONCURRENTLY:
            thread_pool = Pool(processes=THREAD_NUMBER)
            result_as_list = thread_pool.map(predict, urls)
            url_to_prediction =  dict((key,d[key]) for d in result_as_list for key in d)
        # Using serial calls
        else:
            for url in urls:
                url_to_prediction.update(predict(url))

        response = jsonify(url_to_prediction)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    return "Bad Request", 400

def shutdown_handler(signal_int: int, frame: FrameType) -> None:
    logger.info(f"Caught Signal {signal.strsignal(signal_int)}")

    from utils.logging import flush

    flush()

    # Safely exit program
    sys.exit(0)


if __name__ == "__main__":
    # Running application locally, outside of a Google Cloud Environment

    # handles Ctrl-C termination
    signal.signal(signal.SIGINT, shutdown_handler)

    app.run(host="localhost", port=8080, debug=True)
else:
    # handles Cloud Run container termination
    signal.signal(signal.SIGTERM, shutdown_handler)
