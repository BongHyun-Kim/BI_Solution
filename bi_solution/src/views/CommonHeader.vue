<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav id="header">
        <b-nav-item href="#"
          ><img id="header_img" src="../assets/title.png"
        /></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav id="search_area">
        <b-input-group>
          <b-input-group-prepend>
            <b-button variant="outline-light" id="search_button"
              ><b-icon icon="search"></b-icon
            ></b-button>
          </b-input-group-prepend>
          <b-form-input type="text" placeholder="search"></b-form-input>
        </b-input-group>
      </b-navbar-nav>
    </b-navbar>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="First" active><p>I'm the first tab</p></b-tab>
        <b-tab title="Second"><p>I'm the second tab</p></b-tab>
        <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  // eslint-disable-next-line
};
</script>
<style>
#header {
  width: 25%;
}
#header_img {
  width: 80%;
}
#search_button {
  background-color: black;
  border-right: 0;
  border-color: white;
}
#search_area {
  float: right;
}
</style>
