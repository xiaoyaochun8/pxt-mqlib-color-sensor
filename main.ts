/**
 * mqColorSensor blocks
 */
//% groups=['colorSensor']
namespace mqlib {

    const COLOR_ADD = 0X53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0X10;
    const COLOR_G = 0X0D;
    const COLOR_B = 0x13;

    let initialized = false;
    let val_red = 0;
    let val_green = 0;
    let val_blue = 0;

    function i2cWriteData(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function setRegConfig(): void {
        i2cWriteData(COLOR_ADD, COLOR_REG, 0X06);
        i2cWriteData(COLOR_ADD, 0X04, 0X41);
        i2cWriteData(COLOR_ADD, 0x05, 0x01);
    }
    //% subcategory="colorSensor"
    //% group='colorSensor'
    //% block="颜色识别 初始化模块"
    //% weight=100
    function initColorI2C(): void {
        setRegConfig();
        initialized = true;
    }

    function GetRGB(): void {
        let buff_R = pins.createBuffer(2);
        let buff_G = pins.createBuffer(2);
        let buff_B = pins.createBuffer(2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        buff_G = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);
        buff_B = pins.i2cReadBuffer(COLOR_ADD, 2);

        let Red = (buff_R[1] & 0xff) << 8 | (buff_R[0] & 0xff);
        let Green = (buff_G[1] & 0xff) << 8 | (buff_G[0] & 0xff);
        let Blue = (buff_B[1] & 0xff) << 8 | (buff_B[0] & 0xff);

        if (Red > 4500) Red = 2300;
        if (Green > 7600) Green = 4600;
        if (Blue > 4600) Blue = 2700;

        val_red = Math.map(Red, 0, 2300, 0, 255);
        val_green = Math.map(Green, 0, 4600, 0, 255);
        val_blue = Math.map(Blue, 0, 2700, 0, 255);

        if (val_red > 255) val_red = 255;
        if (val_green > 255) val_green = 255;
        if (val_blue > 255) val_blue = 255;
    }

    //% subcategory="colorSensor"
    //% group='colorSensor'
    //% block="识别颜色值 白黑红绿蓝黄橙"
    //% weight=99
    export function GetRGBValue(): string {
        // if (!initialized) {
        //     initColorI2C();
        // }
        GetRGB();
        //rmin,rmax,gmin,gmax,bmin,bmax,name
        let retColor = 'xx';
        // if (val_red >= 200 && val_red <=255 &&
        //     val_green >= 200 && val_green <= 255 &&
        //     val_blue >= 200 && val_blue <= 255) {
        //     retColor = 'red';
        // }
        // else if (val_red >= 230 && val_red <= 255 &&
        //     val_green >= 80 && val_green <= 160 &&
        //     val_blue >= 0 && val_blue <= 50) {
        //     retColor = 'orange';
        // }
        // else if (val_red >= 220 && val_red <= 255 &&
        //     val_green >= 220 && val_green <= 255 &&
        //     val_blue >= 0 && val_blue <= 100) {
        //     retColor = 'yellow';
        // }
        // else if (val_red >= 0 && val_red <= 80 &&
        //     val_green >= 150 && val_green <= 255 &&
        //     val_blue >= 0 && val_blue <= 120) {
        //     retColor = 'green';
        // }
        // else if (val_red >= 0 && val_red <= 60 &&
        //     val_green >= 180 && val_green <= 255 &&
        //     val_blue >= 180 && val_blue <= 255) {
        //     retColor = 'cyan';
        // }
        // else if (val_red >= 0 && val_red <= 60 &&
        //     val_green >= 0 && val_green <= 100 &&
        //     val_blue >= 160 && val_blue <= 255) {
        //     retColor = 'blue';
        // }
        // else if (val_red >= 100 && val_red <= 180 &&
        //     val_green >= 0 && val_green <= 80 &&
        //     val_blue >= 120 && val_blue <= 220) {
        //     retColor = 'purple';
        // }
        // else if (val_red >= 230 && val_red <= 255 &&
        //     val_green >= 150 && val_green <= 200 &&
        //     val_blue >= 180 && val_blue <= 220) {
        //     retColor = 'pink';
        // }
        // else if (val_red >= 0 && val_red <= 30 &&
        //     val_green >= 0 && val_green <= 30 &&
        //     val_blue >= 0 && val_blue <= 30) {
        //     retColor = 'black';
        // }
        // else if (val_red >= 230 && val_red <= 255 &&
        //     val_green >= 230 && val_green <= 255 &&
        //     val_blue >= 230 && val_blue <= 255) {
        //     retColor = 'white';
        // }
        // else if (val_red >= 200 && val_red <= 230 &&
        //     val_green >= 200 && val_green <= 230 &&
        //     val_blue >= 200 && val_blue <= 230) {
        //     retColor = 'gray';
        // }
        // else if (val_red >= 140 && val_red <= 180 &&
        //     val_green >= 70 && val_green <= 100 &&
        //     val_blue >= 50 && val_blue <= 80) {
        //     retColor = 'brown';
        // }
        if (val_red >= 250 && val_red <= 255 &&
            val_green >= 250 && val_green <= 255 &&
            val_blue >= 250 && val_blue <= 255) {
            retColor = 'white';
        }
        else if (val_red >= 0 && val_red <= 30 &&
            val_green >= 0 && val_green <= 30 &&
            val_blue >= 0 && val_blue <= 30) {
            retColor = 'black';
        }
        else if (val_red >= 230 && val_red <=255 &&
            val_green >= 0 && val_green <= 100 &&
            val_blue >= 0 && val_blue <= 100) {
            retColor = 'red';
        }
        else if (val_red >= 0 && val_red <=125 &&
            val_green >= 230 && val_green <= 255 &&
            val_blue >= 0 && val_blue <= 165) {
            retColor = 'green';
        }
        else if (val_red >= 0 && val_red <= 100 &&
            val_green >= 0 && val_green <= 100 &&
            val_blue >= 0 && val_blue <= 230) {
            retColor = 'blue';
        }
        else if (val_red >= 230 && val_red <= 255 &&
            val_green >= 230 && val_green <= 255 &&
            val_blue >= 0 && val_blue <= 120) {
            retColor = 'yellow';
        }
        else if (val_red >= 230 && val_red <= 255 &&
            val_green >= 230 && val_green <= 255 &&
            val_blue >= 0 && val_blue <= 80) {
            retColor = 'orange';
        }
        // else if (val_red >= 230 && val_red <= 255 &&
        //     val_green >= 150 && val_green <= 200 &&
        //     val_blue >= 180 && val_blue <= 220) {
        //     retColor = 'pink';
        // }
        // else if (val_red >= 200 && val_red <= 230 &&
        //     val_green >= 200 && val_green <= 230 &&
        //     val_blue >= 200 && val_blue <= 230) {
        //     retColor = 'gray';
        // }
        serial.writeLine("" + Math.floor(val_red) + "," + Math.floor(val_green) + "," + Math.floor(val_blue) + "," + retColor)
        return retColor;
    }


}