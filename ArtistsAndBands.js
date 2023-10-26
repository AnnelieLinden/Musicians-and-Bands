import Musician from "./Musician.js"
import Band from "./Band.js"
import promptSync from "prompt-sync"
import fs from "fs";
import Manager from "./manager.js";
const prompt = promptSync();

let meny = true;
while (meny) {
  console.log(`
  Uppslagsverk om artister och band:
  1. Kolla information om en artist
  2. Kolla information om ett band
  _________________________________________
  3. Lägg till artist
  4. Ta bort artist
  _________________________________________
  5. Lägg till ett band
  6. Ta bort ett band
  _________________________________________
  7. Tilldela band och medlemmar
  8. Ta bort medlem från band
  9. Historik
  _________________________________________
  A. Avsluta`)
  const choices = prompt();
  const manager = new Manager();
  switch (choices.toUpperCase().trim()) {

    case '1':
      let searchArtistLoop = true;
      while (searchArtistLoop) {
        console.log(`
        1. Sök efter Artist

        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.showMusicianInfo()
         // manager.searchArtist()
        } else if (choice.toUpperCase() == "B") {
          searchArtistLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break; 
    case '2':
      let searchBandLoop = true;
      while (searchBandLoop) {
        console.log(`
        1. Sök efter ett band
      
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt();
        if (choice == 1) {
          manager.showBandInfo()
          //manager.searchBand()
        } else if (choice.toUpperCase() == "B") {
          searchBandLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '3':
      let newArtistLoop = true;
      while (newArtistLoop) {
       console.log(`
        1. Lägg till en artist 
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt();
        if (choice == 1) {
          manager.createNewArtist()
        } else if (choice.toUpperCase() == "B") {
          newArtistLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '4':
      let removeArtistLoop = true;
      while (removeArtistLoop) {
        console.log(`
        1. Ta bort en artist (Artisten kommer synas under menyvalet historik)
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.removeMusician()
        } else if (choice.toUpperCase() == "B") {
          removeArtistLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '5':
      let newBandLoop = true;
      while (newBandLoop) {
       console.log(`
        1. Lägg till ett band
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.createNewBand()
        } else if (choice.toUpperCase() == "B") {
          newBandLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '6':
      let removeBandLoop = true;
      while (removeBandLoop) {
        console.log(`
        1. Ta bort ett band (Bandet kommer synas under menyvalet historik)
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.removeBand()
        } else if (choice.toUpperCase() == "B") {
          removeBandLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '7':
      let addMusicianToBandLoop = true;
      while (addMusicianToBandLoop) {
        console.log(`
        1. Lägg till en artist i ett band (Både artist och band uppdateras)
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.addArtistToBand()
        } else if (choice.toUpperCase() == "B") {
          addMusicianToBandLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '8':
      let removeFromBandLoop = true;
      while (removeFromBandLoop) {
        console.log(`
        1. Ta bort en artist från ett band (Både artist och band uppdateras)
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.removeArtistFromBand()
        } else if (choice.toUpperCase() == "B") {
          removeFromBandLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case '9':
      let retiredLoop = true;
      while (retiredLoop) {
        console.log(`
        1. Kolla infromation om forna band
        2. Kolla information om forna artister
        
        B. Gå tillbaka till huvudmenyn`);
        const choice = prompt()
        if (choice == 1) {
          manager.printRetiredBands()
        } else if (choice == 2) {
          manager.printRetiredMusicians()
        } else if (choice.toUpperCase() == "B") {
          retiredLoop = false;
          break;
        } else {
          console.log("Du måste välja 1 eller B")
        }
      }
      break;
    case 'A':
      console.log("Avslutar")
      meny = false;
      break;
    default:
      console.log(`Du måste använda de angivna siffrorna i menyn.`)
  }
}
