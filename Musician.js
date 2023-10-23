export default class Musician {
  name;
  info;
  birthday;
  instruments;
  joinedBands = []
  pastBands = []
  constructor(newArtistName, newArtistInfo, addArtistBirthday, instrumentsPlayed) {
    this.name = newArtistName
    this.info = newArtistInfo
    this.birthday = addArtistBirthday
    this.instruments = instrumentsPlayed
  }
}
