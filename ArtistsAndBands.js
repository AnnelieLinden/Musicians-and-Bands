import Musician from "./Musician.js"
import Band from "./Band.js"
import promptSync from "prompt-sync"
import fs from "fs";
import Manager from "./manager.js";

//FRÅGA KALLE!!
// joinedBands och previosBands bör inte ligga på musician och bör således inte frågas efter vid skapande av ny artist?
// removeMusician flyttar inte en artist till retiredMusicians (onödig ifsats i den funktionen??)


const prompt = promptSync();

let meny = true;
while (meny) {
  console.log(`
  Uppslagsverk om artister och band:
  1. Kolla information om en artist
  2. Kolla information om ett band
  3. Lägg till artist
  4. Ta bort artist
  5. Lägg till ett band
  6. Ta bort ett band
  7. Tilldela band åt musiker
  8. Historik

  A. Avsluta`)
  const choices = prompt();
  const manager = new Manager();
  switch (choices.trimEnd().toUpperCase) {

    case '1':
      let searchArtistLoop = true;
      while (searchArtistLoop) {
        const choice = prompt(`
        1. Sök efter Artist

            B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.searchArtist()
        } else if (choice == "B") {
          searchArtistLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;
    case '2':
      let searchBandLoop = true;
      while (searchBandLoop) {
        const choice = prompt(`
        1. Sök efter ett band
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.searchBand()
        } else if (choice == "B") {
          searchBandLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;

    case '3':
      let newArtistLoop = true;
      while (newArtistLoop) {
        const choice = prompt(`
        1. Lägg till en artist 
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.createNewArtist()
        } else if (choice == "B") {
          newArtistLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;
    case '4':
      let removeArtistLoop = true;
      while (removeArtistLoop) {
        const choice = prompt(`
        1.Ta bort en artist (Artisten kommer synas under menyvalet historik)
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.removeMusician()
        } else if (choice == "B") {
          removeArtistLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;
    case '5':
      let newBandLoop = true;
      while (newBandLoop) {
        const choice = prompt(`
        1. Lägg till ett band
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.createNewBand()
        } else if (choice == "B") {
          newBandLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;
    case '6':
      let removeBandLoop = true;
      while (removeBandLoop) {
        const choice = prompt(`
        1. Ta bort ett band (Bandet kommer synas under menyvalet historik)
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.removeBand()
        } else if (choice == "B") {
          removeBandLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;
    case '7':
      let addMusicianToBandLoop = true;
      while (addMusicianToBandLoop) {
        const choice = prompt(`
        1. Lägg till en artist (Artisten flyttas historik)
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          //manager.()
        } else if (choice == "B") {
          addMusicianToBandLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break;
    case '8':
      let retiredLoop = true;
      while (retiredLoop) {
        const choice = prompt(`
        1. Kolla infromation om forna band
        2. Kolla information om forna artister
        
        B. Gå tillbaka till huvudmenyn`);
        if (choice == 1) {
          manager.printRetiredBands()
        } else if (choice == 2) {
          manager.printRetiredMusicians
        } else if (choice == "B") {
          retiredLoop = false;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      } break; 
  }
}


    
