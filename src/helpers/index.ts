export const getBrightness = (scene: string): {brightness: number; brightnessText: string} => {
    let brightness: number;
    let brightnessText: string;
    if (scene.includes(':')) {
        brightness = Number(scene.split(':')[1])
        brightnessText = `${brightness} %`
    } else {
        if (scene.includes('On')) {
            brightness = 100
            brightnessText = 'All On'
        } else {
            brightness = 0
            brightnessText = 'All Off'
        }
    }
    return {brightness, brightnessText}
}