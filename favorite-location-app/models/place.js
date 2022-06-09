export class Place {
    constructor(title, imgUri, location, id) {
        this.title = title,
        this.imgUri = imgUri,
        this.address = location.address,
        this.location = {lat: location.lat, long: location.long} // lat: 123 logt: 12321,
        this.id = id
    }
}