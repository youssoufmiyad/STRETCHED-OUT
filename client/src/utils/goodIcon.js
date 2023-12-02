import All from '../assets/icons/all.png'
import Gym from '../assets/icons/gym.png'
import Dumbbell from '../assets/icons/dumbbell.png'
import Barbell from '../assets/icons/barbell.png'
import Kettlebell from '../assets/icons/kettlebell.png'
import BodyWeight from '../assets/icons/bodyWeight.png'
import Hammer from '../assets/icons/hammer.png'
import BosuBall from '../assets/icons/bosuBall.png'
import Assisted from '../assets/icons/assisted.png'
import Band from '../assets/icons/band.png'
import Rope from '../assets/icons/rope.png'
import Circle from '../assets/icons/circle.png'
import WheelRoller from '../assets/icons/wheel roller.png'
import FoamRoller from '../assets/icons/foam roll.png'
import Weighted from '../assets/icons/weighted.png'

export const goodIcon = (equipment) => {
    let eq = "";
    switch (equipment) {
        case "all":
            eq = All;
            break;
        case "assisted":
            eq = Assisted;
            break;
        case "band":
            eq = Band;
            break;
        case "barbell":
            eq = Barbell;
            break;
        case "body weight":
            eq = BodyWeight;
            break;
        case "bosu ball":
            eq = BosuBall;
            break;
        case "cable":
            eq = Rope;
            break;
        case "dumbbell":
            eq = Dumbbell;
            break;
        case "ez barbell":
            eq = Barbell;
            break;
        case "olympic barbell":
            eq = Barbell;
            break;
        case "hammer":
            eq = Hammer;
            break;
        case "kettlebell":
            eq = Kettlebell;
            break;
        case "medicine ball":
            eq = Circle;
            break;
        case "resistance band":
            eq = Band;
            break;
        case "roller":
            eq = FoamRoller;
            break;
        case "wheel roller":
            eq = WheelRoller;
            break;
        case "rope":
            eq = Rope;
            break;
        case "stability ball":
            eq = Circle;
            break;
        case "weighted":
            eq = Weighted;
            break;
        default:
            eq = Gym;
            break;
        
    }
    return eq;
}