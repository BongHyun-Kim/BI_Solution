<template>
  <div>
    <b-container id="head_container">
      <b-row id="row_box">
        <b-col>
          <a href="/"><img id="header_img" src="../assets/img/title.png" /></a>
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
@import "../assets/css/header.css";
</style>
