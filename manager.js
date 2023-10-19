import fs from "fs";
import promptSync from "prompt-sync"
import Musician from "./Musician.js"
import Band from "./Band.js"
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
  }
  createNewArtist() {
    const newId = allMusicians.length + 1
    console.log("Skriv namnet på den nya artisten.")
    const newArtistName = prompt();
    console.log("Skriv lite information om artisten.")
    const newArtistInfo = prompt();
    console.log("När är artisten född?")
    const addArtistBirthday = prompt();
    console.log("Vilka instrument spelar denna artisten?")
    const instrumentsPlayed = prompt();
    console.log("Ny artist sparad i registret.")
    const musician = new Musician(newId, newArtistName, newArtistInfo, addArtistBirthday, instrumentsPlayed)
    allMusicians.push(musician)
    this.updateallMusicians()
    return new Musician(newId, newArtistName, newArtistInfo, addArtistBirthday, instrumentsPlayed)
  }
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
    allBands.push(band)
    this.updateAllBands()
    return new Band(newBandName, newBandInfo, founded, disolved)
  }

  printAllMusicians() {
    for (let i = 0; i < allMusicians.length; i++) {
      console.log(`${i + 1}. ${allMusicians[i].name}`);
    }
  }
  printAllBands() {
    for (let i = 0; i < allBands.length; i++) {
      console.log(`${i + 1}. ${allBands[i].name}`);
    }
  }
  removeBand() {
    this.printAllBands();
    console.log("Skriv in siffran för bandet du vill ta bort");
    const index = prompt();
    if (isNaN(Number(index))) {
      console.log("Skriv den angivna siffran för att ta bort önskad artist.");
    }
    if (index <= allBands.length && index >= 1) {
      allBands.removeBand(Number(index) - 1);
      allBands.splice(index, 1)
      this.updateAllBands()
      this.updateRetiredBands()
    } else {
      console.log(`Skriv den angivna siffran för att ta bort önskad artist.`);
    }
  }
  removeMusician() {
    this.printAllMusicians();
    console.log("Skriv in siffran för artisten du vill ta bort");
    const index = prompt();
    if (isNaN(Number(index))) {
      console.log("Ogiltig inmatning.");
      return
    }
    if (index <= allMusicians.length && index >= 1) {
      retiredMusicians.push(allMusicians[i])
      allMusicians.splice(index, 1)
      this.updateallMusicians()
      this.updateAllBands
      this.updateRetiredBands
      this.updateRetiredMusicians
    } else {
      console.log(`Försök igen.`);
    }
  }
  printRetiredMusicians() {
    for (let i = 0; i < retiredMusicians.length; i++) {
      console.log(`${i + 1}. ${retiredMusicians[i].name}`);
    }
  }
  printRetiredBands() {
    for (let i = 0; i < retiredBands.length; i++) {
      console.log(`${i + 1}. ${retiredBands[i].name}`);
    }
  }
  newMember(name, joinedYear, instrument) {
    this.currentMembers.push({
      name: name,
      joinedYear: joinedYear,
      instrument: instrument
    })
    this.updateallMusicians()
  }
  searchArtist() {
    console.log("Skriv ett artistnamn")
    const userSearch = prompt();
    let foundMusician = allMusicians.filter(function (musician) {
      return musician.name.includes(userSearch)
    });
    if (foundMusician.length > 0) {
      console.log(foundMusician);
    } else {
      console.log("Kunde inte hitta någon artist")
    }
  }
  searchBand() {
    console.log("Skriv ett bandnamn")
    const userSearch = prompt();
    let foundBand = allBands.filter(function (band) {
      return band.bandName.includes(userSearch)
    });
    if (foundBand <= 1) {
      console.log(foundBand);
    } else {
      console.log("Kunde inte hitta något band")
    }
  }
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
    if (indexArtist == 1) {
      if (indexBand == 1) {
        //allBands.indexBand.currentMembers.push(indexArtist) ????
        this.updateAllBands()
        this.updateallMusicians
      }
    } else {
      console.log(`Skriv den angivna siffran.`);
    }
  }
  updateAllBands() {
    fs.writeFileSync('./allBands.json', JSON.stringify(allBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
  updateallMusicians() {
    fs.writeFileSync('./allMusicians.json', JSON.stringify(allMusicians, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
  updateRetiredMusicians() {
    fs.writeFileSync('./retiredMusicians.json', JSON.stringify(retiredMusicians, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
  updateRetiredBands() {
    fs.writeFileSync('./retiredBands.json', JSON.stringify(retiredBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
}


