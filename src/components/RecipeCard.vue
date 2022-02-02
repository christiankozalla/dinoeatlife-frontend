<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ recipe.name || "Neues Rezept..." }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      {{ recipe.body || "Beschreibe, wie das Rezept zubereitet wird..." }}
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";

export default defineComponent({
  components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
});
</script>
