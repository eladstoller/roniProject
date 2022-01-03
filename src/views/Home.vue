<template>
  <div class="Home">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <form action="/action_page.php">
      <div class="container">
        <div class="title">
          <b>Hello, customer!</b>
          <div class="subtitle">Please fill your car details below</div>
        </div>
      </div>
      <hr />

      <div class="content">
        <div class="user-details"></div>
        <div class="input-box">
          <label class="details" for="Manufacturer"
            ><b>Manufacturer: </b></label
          >
          <select
            class="firstList selectFilter"
            v-on:change="manufacturereChanged"
            v-model="Manufacturer"
          >
            <option value="" selected disabled hidden>
              Select a Manufacturer
            </option>
            <option
              v-for="(item, i) in manufacturerOptions"
              v-bind:key="i"
              v-bind:value="{ name: item, idx: i }"
            >
              {{ item }}
            </option>
          </select>

          <label class="details" for="Model"><b>Model: </b></label>
          <select
            data-target="thirdList"
            class="secondList selectFilter"
            v-model="Model"
          >
            <option value="" selected disabled hidden>Select a Model</option>
            <option
              v-for="(item, i) in modelOptions"
              v-bind:key="i"
              v-bind:value="{ name: item, idx: i }"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div class="input-box">
          <label class="details" for="Condition"><b>Condition: </b></label>
          <select name="Condition" required v-model="Condition">
            <option value="" selected disabled hidden>
              Select a Condition
            </option>
            <option
              v-for="key in Object.keys(conditionOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ conditionOptions[key] }}
            </option>
          </select>
        </div>
        <div class="input-box">
          <label class="details" for="Cylinders"><b>Cylinders: </b></label>

          <select name="Cylinders" required v-model="Cylinders">
            <option value="" selected disabled hidden>
              Select a Cylinders
            </option>
            <option
              v-for="key in Object.keys(cylindersOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ cylindersOptions[key] }}
            </option>
          </select>
        </div>

        <div class="input-box">
          <label class="details" for="Fuel_Type"><b>Fuel Type: </b></label>
          <select name="Fuel_Type" required v-model="Fuel_Type">
            <option value="" selected disabled hidden>
              Select a Fuel Type
            </option>
            <option
              v-for="key in Object.keys(fuelOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ fuelOptions[key] }}
            </option>
          </select>
        </div>
        <div class="input-box">
          <label class="details" for="Transmission"
            ><b>Transmission: </b></label
          >
          <select v-model="Transmission">
            <option value="" selected disabled hidden>
              Select Transmission
            </option>
            <option
              v-for="key in Object.keys(transmissionOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ transmissionOptions[key] }}
            </option>
          </select>
        </div>
        <div class="input-box">
          <label class="details" for="Drive"><b>Drive: </b></label>
          <select name="Drive" required v-model="Drive">
            <option value="" selected disabled hidden>
              Select a Drive like 4X4
            </option>
            <option
              v-for="key in Object.keys(driveOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ driveOptions[key] }}
            </option>
          </select>
        </div>

        <div class="input-box">
          <label class="details" for="Type_of_vehicle"
            ><b>Type of vehicle: </b></label
          >
          <select name="Type_of_vehicle" required v-model="Type_of_vehicle">
            <option value="" selected disabled hidden>
              Select a Type of vehicle
            </option>
            <option
              v-for="key in Object.keys(typeOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ typeOptions[key] }}
            </option>
          </select>
        </div>
        <div class="input-box">
          <label class="details" for="Color"><b>Color: </b></label>
          <select name="Color" required v-model="Color">
            <option value="" selected disabled hidden>Select a Color</option>
            <option
              v-for="key in Object.keys(colorOptions)"
              v-bind:key="key"
              v-bind:value="key"
            >
              {{ colorOptions[key] }}
            </option>
          </select>
        </div>

        <div class="input-box">
          <label class="details" for="Year"><b>Year: </b></label>
          <input
            type="number"
            min="1910"
            max="2022"
            class="input-type-text"
            placeholder="Please insert 1910-2022"
            id="Year"
            name="Year"
            v-model="Year"
          />
        </div>
        <div class="input-box">
          <label class="details" for="Mileage"><b>Mileage: </b></label>
          <input
            type="text"
            class="input-type-text"
            placeholder="Mileage"
            id="Mileage"
            name="Mileage"
            v-model="Mileage"
          />
        </div>
        <hr />
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
        <button @click.prevent="goToResult" class="registerbtn">
          continue to recommended price
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { models } from "../assets/models";
import { modelsKeys } from "../assets/convert_keys";
import { getPredictedPrice } from "../utils/api";
import { savePredictions } from "../utils/firebaseUtils";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      Manufacturer: "",
      Model: "",
      Condition: "",
      Cylinders: "",
      Fuel_Type: "",
      Transmission: "",
      Drive: "",
      Type_of_vehicle: "",
      Color: "",
      Year: "2021",
      Mileage: "",
      error: null,
      errorMsg: "",
      manufacturerOptions: [],
      modelOptions: [],
      conditionOptions: {
        0: "excellent",
        1: "fair",
        2: "good",
        3: "like new",
        4: "new",
        5: "salvage",
      },
      cylindersOptions: {
        0: "3 cylinders",
        1: "4 cylinders",
        2: "5 cylinders",
        3: "6 cylinders",
        4: "8 cylinders",
        5: "10 cylinders",
        6: "12 cylinders",
        7: "other",
      },
      fuelOptions: {
        0: "diesel",
        1: "electric",
        2: "gas",
        3: "hybrid",
        4: "other",
      },
      transmissionOptions: { 0: "automatic", 1: "manual", 2: "other" },
      driveOptions: { 0: "4wd", 1: "fwd", 2: "rwd" },
      typeOptions: {
        0: "SUV",
        1: "bus",
        2: "convertible",
        3: "coupe",
        4: "hatchback",
        5: "mini-van",
        6: "offroad",
        7: "other",
        8: "pickup",
        9: "sedan",
        10: "truck",
        11: "van",
        12: "wagon",
      },
      colorOptions: {
        0: "black",
        1: "blue",
        2: "brown",
        3: "custom",
        4: "green",
        5: "grey",
        6: "orange",
        7: "purple",
        8: "red",
        9: "silver",
        10: "white",
        11: "yellow",
      },
    };
  },

  created() {
    let manufacturers = Object.keys(models);
    this.manufacturerOptions = manufacturers;
  },

  methods: {
    manufacturereChanged() {
      let model = models[this.Manufacturer.name];
      this.modelOptions = model.models;
    },
    getPayload() {
      return {
        year: String(this.Year),
        manufacturer: String(this.Manufacturer.idx),
        model: String(modelsKeys[this.Model.name] || "0"),
        condition: String(this.Condition),
        cylinders: String(this.Cylinders),
        fuel: String(this.Fuel_Type),
        odometer: String(this.Mileage),
        transmission: String(this.Transmission),
        drive: String(this.Drive),
        type: String(this.Type_of_vehicle),
        paint_color: String(this.Color),
      };
    },
    goToResult() {
      if (Number(this.Year) < 1910 && Number(this.Year) > 2022) {
        this.error = true;
        this.errorMsg = "Year should be in range 1910-2022";
        return;
      }
      if (Number(this.Mileage) < 0) {
        this.error = true;
        this.errorMsg = "Mileage should be greater than 0";
        return;
      }
      if (
        this.Manufacturer.idx !== "" &&
        this.Model.idx !== "" &&
        this.Cylinders !== "" &&
        this.Fuel_Type !== "" &&
        this.Transmission !== "" &&
        this.Drive !== "" &&
        this.Type_of_vehicle !== "" &&
        this.Color !== "" &&
        this.Year !== "" &&
        this.Mileage !== ""
      ) {
        this.error = false; //reset the error state & sign a user up
        this.error = "";
        const userSelectionPayload = this.getPayload();
        getPredictedPrice(userSelectionPayload)
          .then((res) => res.json())
          .then(async (data) => {
            if (!data.error) {
              const responseBody = JSON.parse(data.body);
              await savePredictions(
                this.$store.state.user,
                userSelectionPayload,
                responseBody.result
              );
              this.$store.commit("setPredictedPrice", responseBody.result);
              this.$router.push({ name: "Result" });
            } else {
              throw new Error("API Call now successful");
            }
          })
          .catch((err) => {
            this.error = true;
            this.errorMsg = err.message;
          });
        return true;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
body {
  font-family: "Quicksand", sans-serif;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  margin: 50px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: center;
}

* {
  box-sizing: border-box;
  border-radius: 5px;
}

/* Add padding to containers */
.container {
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}
.container .title {
  font-size: 40px;
  font-weight: 500;
  position: relative;
  text-align: center;
}
.container .subtitle {
  font-size: 15px;
  font-weight: 500;
  position: center;
}
.container .title::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5;
  height: 3px;
  width: 100px;
  border-radius: 5px;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.content .user-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
}
.user-details .input-box {
  margin-bottom: 15px;
  width: 25%;
  height: 25px;
  padding: 15px;
  margin: 5px 0 22px 0;
}
.input-box label.details {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
  width: 25%;
  height: 25px;
  padding: 15px;
  margin: 5px 0 22px 0;
}
.input-box .input-type-text {
  height: 45px;
  width: 25%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  background: #f1f1f1;
  margin: 5px 0 22px 0;
  display: inline-block;
  text-align: center;
}

/* Overwrite default styles of hr */
hr {
  border: 0px solid #ccc;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  height: 45px;
  width: 50%;
  margin: 35px 0;
  border-radius: 5px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.registerbtn:hover {
  /* transform: scale(0.99); */
  background: linear-gradient(-135deg, #71b7e6, #9b59b6);
}

.select {
  width: 25%;
  height: 25px;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  background: #f1f1f1;
  cursor: pointer;
  position: relative;
  border: 1px solid #ccc;
}

label {
  position: relative;

  width: 190px;
  padding-left: 15px;
  text-align: center;
  display: center;
}
select {
  height: 45px;
  width: 25%;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;

  background: #f1f1f1;
  margin: 5px 0 22px 0;
  display: inline-block;
  text-align: center;
}
</style>
