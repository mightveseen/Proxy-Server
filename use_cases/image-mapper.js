export function mapImageToDto(data) {
    return data['photos']?.[0]?.['img_src'];
}