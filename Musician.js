export default class Musician {
  name;
  info;
  birthday;
  instruments = []
  joinedBands = []
  pastBands = []
  constructor(newArtistName, newArtistInfo, artistBirthdayIso, instrumentsPlayed) {
    this.name = newArtistName
    this.info = newArtistInfo
    this.birthday = artistBirthdayIso
    this.instruments = instrumentsPlayed
  }
}
