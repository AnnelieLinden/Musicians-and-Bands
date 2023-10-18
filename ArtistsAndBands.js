import Musician from "./Musician.js"
import Band from "./Band.js"
import promptSync from "prompt-sync"

const prompt = promptSync();
//läsa in jsonfiler om de inte finns använd []. en [] med alla band, och en med alla musiker. spara artister som siffror automatiskt

const allMusicians = [];
const allBands = [];
const pastMusicians = [];

let meny = true;
while (meny) {
  console.log(`
  Uppslagsverk om artister och band:
  1. Kolla information om en artist eller band.
  2. Lägg till eller ta bort artist.
  3. Lägg till eller ta bort ett band.
  4. Historik
  5. Avsluta`)
  const choices = prompt();
  switch (choices) {
    case '1':
      console.log(`
      Sök efter:
      1. Band
      2. Artist`)
      const bandOrArtist = prompt();
      if (bandOrArtist == 1) {
        console.log(`Skriv ett bandnamn`)
        const userSearch = prompt();
        let foundBands = allBands.filter(function (band) {
          return band.bandName.includes(userSearch)
        })
        if (foundBands.length > 0) {
          console.log(foundBands)
        } else {
          console.log("Kunde inte hitta något band.")
        }
      } else if (bandOrArtist == 2) {
        console.log("Skriv ett artistnamn")
        const userSearch = prompt();
        let foundMusicians = allMusicians.filter(function (musician) {
          return musician.name.includes(userSearch)
        })
        if (foundMusicians.length > 0) {
          console.log(foundMusicians)

        } else {
          console.log("Kunde inte hitta någon artist.")
        }
      }
      else {
        console.log("Använd de angivna siffrorna i menyn.")
      }
      break;

    case '2':
      let addOrDeleteArtistLoop = true;
      while (addOrDeleteArtistLoop) {
        console.log(`
        Välj:
        1. Lägg till en artist
        2. Ta bort en artist`)
        const addOrDeleteArtist = prompt();
        if (addOrDeleteArtist == 1) {
          const musician = createNewArtist()
          allMusicians.push(musician)
          addOrDeleteArtistLoop = false;
        }
        else if (addOrDeleteArtist == 2) {
          console.log("Vilken artist vill du ta bort?")
          const userSearch = prompt();
          let foundMusician = allMusicians.find(function (musician) {
            return musician.name == userSearch
          })
          // foundMusician står som [Object Object]
          console.log("Tar bort " + foundMusician + ".")

          pastMusicians.push(foundMusician)
          /*for (i = 0; i < foundMusician.length;) {

          }*/
          addOrDeleteArtistLoop = false;

        } else {
          console.log("Använd de angivna siffrorna i menyn.")
        }
      } break;

    case '3':
      let addOrDeleteBandLoop = true;
      while (addOrDeleteBandLoop) {
        console.log(`
        Välj:
        1. Lägg till ett band
        2. Ta bort ett band`)
        const addOrDeleteBand = prompt();
        if (addOrDeleteBand == 1) {
          const band = createNewBand()
          allBands.push(band)
          addOrDeleteBandLoop = false;
        } else if (addOrDeleteBand == 2) {
          console.log("Vilken artist vill du ta bort?")
          const userSearch = prompt();
          let foundBand = allBands.find(function (band) {
            return band.bandName == userSearch
          })
          //foundBand står som [Object Object]
          console.log("Tar bort " + foundBand + ".")

          pastMusicians.push(foundBand)
          /*for (i = 0; i < foundBand.length;) {

          }*/
          addOrDeleteBandLoop = false;
        } else {
          console.log("Använd de angivna siffrorna i menyn.")
        }
      } break;

    case '4':
      console.log(`Historik:`)
      console.log(pastMusicians)
      break;

    case '5':
      console.log(`Avslutar`)
      meny = false;
      break;

    default:
      console.log(`Använd de angivna siffrorna i menyn.`)
  }
}
function createNewArtist() {
  const newId = allMusicians.length + 1
  console.log("Skriv namnet på den nya artisten.")
  const newArtistName = prompt();
  console.log("Skriv lite information om artisten.")
  const newArtistInfo = prompt();
  console.log("När är artisten född?")
  const addArtistBirthday = prompt();
  console.log("Vilket eller vilka band tillhör den här artisten?")
  const addJoinedBands = prompt();
  console.log("Vilka band har den här artisten tillhört förut?")
  const addPastBands = prompt();
  console.log("Vilken roll har artisten i bandet?")
  const instrumentsPlayed = prompt();
  console.log("Ny artist sparad i registret.")
  return new Musician(newId, newArtistName, newArtistInfo, addArtistBirthday, addJoinedBands, addPastBands, instrumentsPlayed)
}
function createNewBand() {
  console.log("Skriv namnet på bandet")
  const newBandName = prompt();
  console.log("Skriv lite information om bandet.")
  const newBandInfo = prompt();
  console.log("Vilket år grundades bandet?")
  const founded = prompt();
  console.log("Vilket år splittrades bandet?")
  const disolved = prompt();
  console.log("Vilka artiser är med i detta bandet nu?")
  const current = prompt();
  console.log("Vilka artiser har varit med i detta bandet tidigare?")
  const previous = prompt();
  console.log("Nytt band sparat i registret.")
  return new Band(newBandName, newBandInfo, founded, disolved, current, previous)
}





console.log(``)
console.log(``)
console.log(``)
console.log(``)