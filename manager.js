import fs from "fs";
import promptSync from "prompt-sync"
import Musician from "./Musician.js"
import Band from "./Band.js"
import { inspect } from 'util'

const prompt = promptSync();
const jsonStringBands = fs.readFileSync("allBands.json");
const allBands = JSON.parse(jsonStringBands);
const jsonStringMusicians = fs.readFileSync("allMusicians.json");
const allMusicians = JSON.parse(jsonStringMusicians);
const jsonStringRetiredBands = fs.readFileSync("retiredBands.json");
const retiredBands = JSON.parse(jsonStringRetiredBands);
const jsonStringRetiredMusicians = fs.readFileSync("retiredMusicians.json");
const retiredMusicians = JSON.parse(jsonStringRetiredMusicians);


export default class Manager {
  bands = []
  musicians = []
  constructor() {
    this.bands = allBands;
    this.musicians = allMusicians;
  }//klar
  createNewArtist() {
    //const newId = allMusicians.length + 1
    console.log("Skriv namnet på den nya artisten.")
    const newArtistName = prompt();
    console.log("Skriv lite information om artisten.")
    const newArtistInfo = prompt();
    console.log("När är artisten född?")
    const addArtistBirthday = prompt();
    console.log("Vilka instrument spelar denna artisten?")
    const instrumentsPlayed = prompt();
    console.log("Ny artist sparad i registret.")
    const musician = new Musician(newArtistName, newArtistInfo, addArtistBirthday, instrumentsPlayed)
    allMusicians.push(musician)
    this.updateAllMusicians()
    return new Musician(newArtistName, newArtistInfo, addArtistBirthday, instrumentsPlayed)
  }//klar
  createNewBand() {
    console.log("Skriv namnet på bandet")
    const newBandName = prompt();
    console.log("Skriv lite information om bandet")
    const newBandInfo = prompt();
    console.log("Vilket år grundades bandet?")
    const founded = prompt();
    console.log("Vilket år splittrades bandet?")
    const disolved = prompt();
    console.log("Nytt band sparat i registret.")
    const band = new Band(newBandName, newBandInfo, founded, disolved)
    this.bands.push(band)
    this.updateAllBands()
    return new Band(newBandName, newBandInfo, founded, disolved)
  }//klar
  printAllMusicians() {
    for (let i = 0; i < allMusicians.length; i++) {
      console.log(`${i}. ${allMusicians[i].name}`);
    }
  }//klar
  printAllBands() {
    for (let i = 0; i < allBands.length; i++) {
      console.log(`${i}. ${allBands[i].bandName}`);
    }
  }
  artistAge() {
    const currentDate = parseInt(Date().substring(11, 16).trim())
    const age = currentDate - Musician.birthday
    return age
  }//klar
  showMusicianInfo() {
    this.printAllMusicians()
    console.log(`Skriv in siffran som står framför önskad artist.`)
    const indexArtist = prompt();
    const artist = this.musicians[indexArtist]
    this.artistAge(artist)
    console.log(inspect(artist, age, { depth: 3 }))
  }//klar
  showBandInfo() {
    this.printAllBands()
    console.log(`Skriv in siffran som står framför önskat band.`)
    const indexBand = prompt();
    const band = this.bands[indexBand]
    console.log(inspect(band, { depth: 3 }))
  }//klar
  removeBand() {
    this.printAllBands();
    console.log("Skriv in siffran för bandet du vill ta bort");
    const index = prompt();
    if (isNaN(Number(index))) {
      console.log("Skriv den angivna siffran för att ta bort önskad artist.");
    }
    if (index <= this.bands.length) {
      retiredBands.push(allBands[index])
      this.bands.splice(index, 1)
      this.updateAllBands()
      this.updateRetiredBands()
      this.updateRetiredMusicians()
      this.updateAllMusicians()()

    } else {
      console.log(`Skriv den angivna siffran för att ta bort önskad artist.`);
    }
  }//klar
  removeMusician() {
    this.printAllMusicians();
    console.log("Skriv in siffran för artisten du vill ta bort");
    const index = prompt();
    if (isNaN(Number(index))) {
      console.log("Ogiltig inmatning.");
      return
    }
    if (index <= allMusicians.length) {
      retiredMusicians.push(allMusicians[index])
      allMusicians.splice(index, 1)
      this.updateAllMusicians()()
      this.updateAllBands()
      this.updateRetiredBands()
      this.updateRetiredMusicians()
    } else {
      console.log(`Försök igen.`);
    }

  }//klar
  printRetiredMusicians() {
    for (let i = 0; i < retiredMusicians.length; i++) {
      console.log(retiredMusicians);
    }
  }//klar
  printRetiredBands() {
    for (let i = 0; i < retiredBands.length; i++) {
      console.log(retiredBands);
    }
  }//klar
  addArtistToBand() {
    this.printAllMusicians()
    console.log("Skriv in siffran för artisten du vill lägga till i ett band");
    const indexArtist = prompt();
    if (isNaN(Number(indexArtist))) {
      console.log("Skriv den angivna siffran.");
    }
    this.printAllBands()
    console.log("Skriv in siffran för bandet du vill lägga till artisten i");
    const indexBand = prompt();
    if (isNaN(Number(indexBand))) {
      console.log("Skriv den angivna siffran.");
    }
    if (indexArtist >= 0) {
      if (indexBand >= 0) {
        const band = this.bands[indexBand]
        const artist = this.musicians[indexArtist]
        console.log("När gick artisten med i bandet?")
        const joinedYear = prompt();
        console.log("Vilken roll har artisten i bandet?")
        const bandRole = prompt();

        const newBandmember = {
          Name: artist.name,
          Since: joinedYear,
          Instrument: bandRole,
        }
        const newJoinedBand = {
          Name: band.bandName,
          Since: joinedYear,
          Instrument: bandRole,
        }
        band.currentMembers.push(newBandmember)
        artist.joinedBands.push(newJoinedBand)
        this.updateAllBands()
        this.updateAllMusicians()
      }
    } else {
      console.log(`Skriv den angivna siffran.`);
    }
  }//klar
  removeArtistFromBand() {
    this.printAllBands()
    console.log("Skriv in siffran för bandet du vill ta bort en artist från");
    const indexBand = prompt();
    if (isNaN(Number(indexBand))) {
      console.log("Skriv den angivna siffran.");
    }
    const band = this.bands[indexBand]
    for (let i = 0; i < band.currentMembers.length; i++) {
      console.log(`${i}. ${band.currentMembers[i].Name}`);
    }
    console.log("Skriv den angivna siffran framför artisten för att ta bort hen från " + band.bandName)
    const indexArtist = prompt();
    const artist = this.musicians[indexArtist]
    if (indexArtist >= 0) {
      if (indexBand >= 0) {
        console.log("När lämnade artisten bandet?");
        const leftYear = prompt();
        console.log("Vilken roll hade artisten i bandet?")
        const bandRole = prompt();
        const previousBandmembers = {
          Namn: artist.name,
          Leftband: leftYear,
          Instrument: bandRole
        }
        const previousBands = {
          Bandnamn: band.bandName,
          Leftband: leftYear,
          Instrument: bandRole
        }
        band.currentMembers.splice(artist, 1)
        band.previousMembers.push(previousBandmembers)
        artist.joinedBands.splice(band, 1)
        artist.pastBands.push(previousBands)
        this.updateAllBands()
        this.updateAllMusicians()
      }
    } else {
      console.log(`Skriv den angivna siffran.`);
    }
  }//klar
  updateAllBands() {
    fs.writeFileSync('./allBands.json', JSON.stringify(allBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }//klar
  updateAllMusicians() {
    fs.writeFileSync('./allMusicians.json', JSON.stringify(allMusicians, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }//klar
  updateRetiredMusicians() {
    fs.writeFileSync('./retiredMusicians.json', JSON.stringify(retiredMusicians, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }//klar
  updateRetiredBands() {
    fs.writeFileSync('./retiredBands.json', JSON.stringify(retiredBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
}


/*searchArtist() {
   console.log("Skriv ett artistnamn")
   const userSearch = prompt();
   let foundMusician = allMusicians.filter(function (musician) {
     return musician.name.includes(userSearch)
   });
   if (foundMusician.length > 0) {
     console.log(inspect(foundMusician, { depth: 3 }))
   } else {
     console.log("Kunde inte hitta någon artist")
   }
 }
 searchBand() {
   console.log("Skriv ett bandnamn")
   const userSearch = prompt();
   let foundBand = allBands.filter(function (allBands) {
     return allBands.bandName.includes(userSearch)
   });
   if (foundBand.length > 0) {
     console.log(inspect(foundBand, {depth: 3}));
   } else {
     console.log("Kunde inte hitta något band")
   }
 }*/

