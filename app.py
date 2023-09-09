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

from utils.logging import logger
from flask import Flask, request, render_template
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

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":

        # url = request.form["url"]
        # obj = FeatureExtraction(url)
        # x = np.array(obj.getFeaturesList()).reshape(1,30) 

        # y_pred =gbc.predict(x)[0]
        # #1 is safe       
        # #-1 is unsafe
        # y_pro_phishing = gbc.predict_proba(x)[0,0]
        # y_pro_non_phishing = gbc.predict_proba(x)[0,1]
        # # if(y_pred ==1 ):
        # pred = "It is {0:.2f} % safe to go ".format(y_pro_phishing*100)
        # #return render_template('index.html',xx =round(y_pro_non_phishing,2),url=url )
        # return str(y_pred)
        return "hello"
    #return render_template("index.html", xx =-1)
    return "none"

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
