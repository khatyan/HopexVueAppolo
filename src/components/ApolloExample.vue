
<template>
  <div class="apollo-example">
    <!-- Cute tiny form -->
    <!-- <div class="form">
      <label for="field-name" class="label">Name</label>
      <input
        v-model="name"
        placeholder="Type a name"
        class="input"
        id="field-name"
      >
    </div> -->

    <!-- Apollo watched Graphql query -->
    <ApolloQuery :query="require('../graphql/HelloWorld.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
              <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{diagramTitle}}</md-dialog-title>
      <img v-auth-image="`http://localhost/HOPEXGraphQL/api/diagram/${diagramid}/image`"/>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
              </md-dialog>
          <md-card v-for="item in data.organizationalProcess" :key="item.id">
            
             <md-card-media>
                <!-- <img v-auth-image="`http://localhost/HOPEXGraphQL/api/diagram/${item.diagram[0].id}/image`"/> -->
              </md-card-media>
            <md-card-header>
        <div class="md-title">{{item.name}}</div>
        <!-- <div class="md-subhead">Subtitle here</div> -->
      </md-card-header>

      <md-card-expand v-if="item.comment">
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button @click="showDialog = true; diagramid=item.diagram[0].id; diagramTitle=item.name" v-if="item.diagram[0]"> Details</md-button>
            <md-button>Remove</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            <span v-html="item.comment"></span>
             
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
          </md-card>


        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>

    <!-- Tchat example
    <ApolloQuery
      :query="require('../graphql/Messages.gql')"
    >
      <ApolloSubscribeToMore
        :document="require('../graphql/MessageAdded.gql')"
        :update-query="onMessageAdded"
      />

      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div
            v-for="message of data.messages"
            :key="message.id"
            class="message"
          >
            {{ message.text }}
          </div>
        </template>
      </div>
    </ApolloQuery>

    <ApolloMutation
      :mutation="require('../graphql/AddMessage.gql')"
      :variables="{
        input: {
          text: newMessage,
        },
      }"
      class="form"
      @done="newMessage = ''"
    >
      <template slot-scope="{ mutate }">
        <form v-on:submit.prevent="formValid && mutate()">
          <label for="field-message">Message</label>
          <input
            id="field-message"
            v-model="newMessage"
            placeholder="Type a message"
            class="input"
          >
        </form>
      </template>
    </ApolloMutation>

    <div class="images">
      <div
        v-for="file of files"
        :key="file.id"
        class="image-item"
      >
        <img :src="`${$filesRoot}/${file.path}`" class="image"/>
      </div>
    </div>

    <div class="image-input">
      <label for="field-image">Image</label>
      <input
        id="field-image"
        type="file"
        accept="image/*"
        required
        @change="onUploadImage"
      >
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Anne",
      newMessage: "",
      showDialog: false,
      diagramid:"",
      diagramTitle:""
    };
  },

  apollo: {},

  computed: {
    formValid() {
      return this.newMessage;
    },
  },

  methods: {
    onMessageAdded(previousResult, { subscriptionData }) {
      return {
        messages: [
          ...previousResult.messages,
          subscriptionData.data.messageAdded,
        ],
      };
    },
  },
};
</script>


<style scoped>
@import '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons';
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
    .md-dialog /deep/.md-dialog-container {
    max-width: 768px;
  }
</style>
