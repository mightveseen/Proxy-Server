import { ImageRequest } from "../class/Image.ts";

export async function mapImageToDto(data: ImageRequest): Promise<string> {
    return data.photos?.[0]?.img_src;
}