<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Recipes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-end">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Recipes</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Recipes -->
      <RecipeList />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import RecipeList from "../components/RecipeList.vue";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    RecipeList,
  },
  // setup() {
  //   const currentIngredient = ref({ name: "", amount: "" });
  //   const recipe = reactive({
  //     name: "",
  //     body: "",
  //     ingredients: [] as [string, string][],
  //   });

  //   const toLocalStorage = () => {
  //     localStorage.setItem(RecipeStorageItemName, JSON.stringify(recipe));
  //   };

  //   const pushCurrentIngredient = () => {
  //     if (currentIngredient.value.name && currentIngredient.value.amount) {
  //       const newIngredient = [
  //         currentIngredient.value.name,
  //         currentIngredient.value.amount,
  //       ] as [string, string];
  //       recipe.ingredients.push(newIngredient);
  //       currentIngredient.value = { name: "", amount: "" };
  //       toLocalStorage();
  //     }
  //   };

  //   return { recipe, toLocalStorage, currentIngredient, pushCurrentIngredient };
  // },
});
</script>
