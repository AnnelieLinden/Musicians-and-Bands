import fs from "fs";
import promptSync from "prompt-sync"
import Musician from "./Musician.js"
import Band from "./Band.js"
import { inspect } from 'util'
import { DateTime } from "luxon";


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
  }//visar fel antal år. en person född 1990 är INTE 34 ÅR!! 
  createNewArtist() {
    console.log("Skriv namnet på den nya artisten.")
    const newArtistName = prompt();
    console.log("Skriv lite information om artisten.")
    const newArtistInfo = prompt();
    let askBirthday = true;
    while (askBirthday) {
      console.log("När är artisten född? Använd formatet åååå-mm-dd.")
      const addArtistBirthday = prompt();
      const artistBirthdayIso = DateTime.fromISO(addArtistBirthday.trim())
      if (artistBirthdayIso.isValid) {
        askBirthday = false;
        console.log("Vilka instrument spelar denna artisten?")
        const instrumentsPlayed = prompt();
        console.log("Ny artist sparad i registret.")
        const musician = new Musician(newArtistName, newArtistInfo, artistBirthdayIso.toISODate(), instrumentsPlayed)
        allMusicians.push(musician)
        this.updateAllMusicians()
        return new Musician(newArtistName, newArtistInfo, artistBirthdayIso, instrumentsPlayed)
      } else {
        console.log("För att kunna räkna ut en ålder behöver vi artistens födelsedag. Använd formatet åååå-mm-dd. Glöm inte bindestrecken.")
      }
    }
  }
  createNewBand() {
    console.log("Skriv namnet på bandet")
    const newBandName = prompt();
    console.log("Skriv lite information om bandet")
    const newBandInfo = prompt();
    console.log("Vilket år grundades bandet?")
    const founded = prompt();
    console.log("Nytt band sparat i registret.")
    const band = new Band(newBandName, newBandInfo, founded)
    this.bands.push(band)
    this.updateAllBands()
    return new Band(newBandName, newBandInfo, founded)
  }
  printAllMusicians() {
    for (let i = 0; i < allMusicians.length; i++) {
      console.log(`${i}. ${allMusicians[i].name}`);
    }
  }
  printAllBands() {
    for (let i = 0; i < allBands.length; i++) {
      console.log(`${i}. ${allBands[i].bandName}`);
    }
  } 
  showMusicianInfo() {
    this.printAllMusicians()
    console.log(`Skriv in siffran som står framför önskad artist.`)
    const indexArtist = prompt();
    const artist = this.musicians[indexArtist]
    const birthday = DateTime.fromISO(artist.birthday)
    const age = birthday.diff(DateTime.now(), "year")
    console.log(`
    Artistens namn: ${artist.name}, 
    Info om artistens : ${artist.info}, 
    Födeledag: ${artist.birthday}, ${(Math.abs(age.years.toFixed(0)))} år gammal.
    Spelar följande instrument: ${artist.instruments}`); 
    console.log(`
    Aktiva band: ` + (inspect(artist.joinedBands, { depth: 3 }))) 
    console.log(`
    Tidigare band: ` + (inspect(artist.pastBands, { depth: 3 })))  

  }
  showBandInfo() {
    this.printAllBands()
    console.log(`Skriv in siffran som står framför önskat band.`)
    const indexBand = prompt();
    const band = this.bands[indexBand]
    console.log(`
    Bandetsnamn: ${band.bandName}
    Info om bandet: ${band.bandInfo}
    Grundades: ${band.founded}`)
    console.log(`
    Aktiva medlemmar: ` + (inspect(band.currentMembers, { depth: 3 })))
    console.log(`
    Tidigare medlemmar: ` + (inspect(band.previousMembers, { depth: 3 })))
  }//Hur flyttar jag medlemmarnas status joinedBands till pastBands?
  removeBand() {
    this.printAllBands();

    console.log("Skriv in siffran för bandet du vill ta bort");
    const index = prompt();
    if (isNaN(Number(index))) {
      console.log("Skriv den angivna siffran för att ta bort önskat band.");
    }
    if (index <= this.bands.length) {
      console.log("Vilket år splittrades eller pensionerades bandet?")
      const disolved = prompt();
      const band = this.bands[index]
      band.disolvedYear = disolved;
      console.log("Band nr " + index + " har upplöst.")
      retiredBands.push(band)
      this.bands.splice(index, 1)
      this.updateAllBands()
      this.updateRetiredBands()
      this.updateRetiredMusicians()
      this.updateAllMusicians()
    } else {
      console.log(`Skriv den angivna siffran för att ta bort önskat band.`);
    }
  }//Hur flyttar jag bandens status currentMembers till previousMembers?
  removeMusician() {
    this.printAllMusicians();
    console.log("Skriv in siffran för artisten du vill ta bort");
    const index = prompt();
    if (isNaN(Number(index))) {
      console.log("Ogiltig inmatning.");
      return
    }
    if (index <= allMusicians.length) {
      console.log("Artist nr " + index + " har avslutat sin artistkarriär.")
      const artist = this.musicians[index]

      artist.pastBands = joinedBands;
      artist.joinedBands = [];

      retiredMusicians.push(allMusicians[index])
      allMusicians.splice(index, 1)
      this.updateAllMusicians()
      this.updateAllBands()
      this.updateRetiredBands()
      this.updateRetiredMusicians()
    } else {
      console.log(`Försök igen.`);
    }

  }
  printRetiredMusicians() {
    for (let i = 0; i < retiredMusicians.length; i++) {
      console.log(inspect(retiredMusicians, { depth: 3 }));
    }
  }
  printRetiredBands() {
    for (let i = 0; i < retiredBands.length; i++) {
      console.log(inspect(retiredBands, { depth: 3 }));
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
  }
  removeArtistFromBand() {
    let removeArtistLoop = true;
    while (removeArtistLoop) {
      this.printAllBands()
      console.log("Skriv in siffran för bandet du vill ta bort en artist från");
      const indexBand = prompt();
      if (isNaN(Number(indexBand))) {
        console.log("Skriv den angivna siffran.");
      } else {
        const band = this.bands[indexBand]
        for (let i = 0; i < band.currentMembers.length; i++) {
          console.log(`${i}. ${band.currentMembers[i].Name}`);
        }
        console.log("Skriv den angivna siffran framför artisten för att ta bort hen från " + band.bandName)
        const indexArtist = prompt();
        if (isNaN(Number(indexBand))) {
          console.log("Skriv den angivna siffran.");
        } else {
          const artist = this.musicians[indexArtist]
          if (indexArtist >= 0) {
            if (indexBand >= 0) {
              removeArtistLoop = false;
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
              band.currentMembers.splice(indexArtist, 1)
              band.previousMembers.push(previousBandmembers)
              artist.joinedBands.splice(indexBand, 1)
              artist.pastBands.push(previousBands)
              this.updateAllBands()
              this.updateAllMusicians()
            }
          } else {
            console.log(`Skriv den angivna siffran.`);
          }
        }

      }

    }

  }
  updateAllBands() {
    fs.writeFileSync('./allBands.json', JSON.stringify(allBands, null, 2), (err) => {
      if (err) throw err;
      console.log('Sparar ny information');
    });
  }
  updateAllMusicians() {
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