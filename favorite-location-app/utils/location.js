import {API_KEY} from "@env"

export function getMapPreview (lat, long) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${long}&key=${API_KEY}`
    return imagePreviewUrl
}



