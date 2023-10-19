export default class Musician {
  id;
  name;
  info;
  birthday;
  joinedBands;
  pastBands;
  instruments;
  constructor(newId, newArtistName, newArtistInfo, addArtistBirthday, addJoinedBands, addPastBands, instrumentsPlayed) {
    this.id = newId
    this.name = newArtistName
    this.info = newArtistInfo
    this.birthday = addArtistBirthday
    this.joinedBands = addJoinedBands
    this.pastBands = addPastBands
    this.instruments = instrumentsPlayed
  }
}
