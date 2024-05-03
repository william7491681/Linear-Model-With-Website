from flask import Flask, request, jsonify
import pandas as pd
import statsmodels.formula.api as smf

df = pd.read_csv("./diamonds.csv")
# Descriptions for non-obvious columns:
# cut - fair, good, very good, premium, ideal
# color - J (worst) - D (best)
# clarity - I1 (worst), SI2, SI1, VS2, VS1, VVS2, VVS1, IF (best)
# x, y, z are length, width, and depth respectively in mm
# depth - total depth percentage ( (z*2) / x+y) )
# table - width of top of diamond relative to widest point in diamond

# Dropping useless index column
df.drop(df.columns[0], axis=1, inplace=True)

# Replacing ordinal cut values with numerical values 1-5.
# Maybe try using dummy variables as well and see how it works
df.replace(["Fair", "Good", "Very Good", "Premium", "Ideal"], [1, 2, 3, 4, 5], inplace=True)

# Replacing ordinal clarity values with numerical values 1-8
df.replace(["I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF"],
    [1, 2, 3, 4, 5, 6, 7, 8], inplace=True)

# Replacing ordinal color values with numerical value 1-7
df.replace(["D", "E", "F", "G", "H", "I", "J"], [7, 6, 5, 4, 3, 2, 1], inplace=True)

model = smf.ols("price ~ carat + clarity + color", data=df).fit()
#print(model.summary())
# print(model.predict(exog=dict(carat=0.29, clarity=5, color=6)))

def convertClarityAndColor(clarity, color):
    clar = {
        "I1": 1,
        "SI2": 2,
        "SI1": 3,
        "VS2": 4,
        "VS1": 5,
        "VVS2": 6,
        "VVS1": 7,
        "IF": 8
    }
    col = {
        "D": 1,
        "E": 2,
        "F": 3,
        "G": 4,
        "H": 5,
        "I": 6,
        "J": 7
    }
    clarity = clar[clarity]
    color = col[color]
    return (clarity, color)

app = Flask(__name__)

@app.route("/")
def linearModel():
    carats = request.args.get("carats")
    clarity = request.args.get("clarity")
    color = request.args.get("color")
    clarity, color = convertClarityAndColor(clarity, color)

    val = None
    if ((carats == None) or (clarity == None) or (color == None)):
        val = "Invalid Request"
    else:
        val = model.predict(exog=dict(carat=float(carats), clarity=clarity, color=color))
    response = jsonify({"value":str(round(float(val), 2))})
    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if (__name__ == "__main__"):
    app.run(port=8080)