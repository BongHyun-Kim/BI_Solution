<template>
  <div>
    <b-container id="head_container">
      <b-row id="row_box">
        <b-col>
          <a href="#"><img id="header_img" src="../assets/title.png" /></a>
        </b-col>
        <b-col>
          <b-input-group id="search_area">
            <b-input-group-prepend>
              <b-button variant="outline-light" id="search_button"
                ><b-icon icon="search"></b-icon
              ></b-button>
            </b-input-group-prepend>
            <b-form-input type="text" placeholder="search"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
};
</script>
<style>
#head_container {
  min-width: 100%;
  background-color: black;
  margin: 0;
  padding: 10px;
  height: 75px;
}
#header {
  width: 25%;
}
#header_img {
  width: 60%;
  float: left;
}
#search_button {
  background-color: black;
  border-right: 0;
  border-color: white;
}
#search_area {
  float: right;
  width: 50%;
}
#row_box {
  align-items: center;
  width: 80%;
  margin: auto;
}
</style>
