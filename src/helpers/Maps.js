
let valueMap = new Map();
valueMap.set('math', ["add", "subtract", "multiply", "divide"]);
valueMap.set('directions', ["right", "left", "up", "down", "back", "forth"]);
valueMap.set('royalty', ["King", "Queen", "Prince", "Princess", "Butler", "Court Jester", "High Priest", "Chief Advisor", "Spy Master", "Guard"])
valueMap.set('alignments', ["Chaotic Good", "Chaotic Neutral", "Chaotic Evil", "Neutral Good", "True Neutral", "Neutral Evil", "Lawful Good", "Lawful Neutral", "Lawful Evil", "Unaligned"])
valueMap.set('answers', ["Yes", "No", "Ask Again", "LOL", "You Fool", "You'll Never Know", "Fat Chance", "Pretty Sure"])
valueMap.set('runes', ["strength of will", "generosity", "danger, suffering", "prosperity, vitality", "movement, work, growth", "mortality, pain", "joy, ecstasy", "destruction, chaos", "need, unfulfilled desire", "harvest, reward", "strength, stability", "protection from enemies, defense of loved ones", "victory, honor", "fertility, growth, sustenance", "trust, faith, companionship", "augmentation, support", "chaos, potential, the unknown", "heritage, tradition, inheritance", "hope, happiness", "fertilization, the beginning of something"])
valueMap.set('emotions', ["Disappointment", "Disgust", "Jealousy", "Trust", "Anger", "Hate", "Remorse", "Awe", "Acceptance", "Shock", "Horror", "Contempt", "Sadness", "Peace", "Gratitude", "Joy", "Worry", "Anticipation", "Love", "Fear"]);

let versionMap = new Map();
versionMap.set('math', {add: 1, subtract:1, multiply:1, divide:1});
versionMap.set('directions', {right: 1, left: 1, up: 1, down: 1, back: 1, forth: 1});
versionMap.set('royalty', {King:1, Queen:1, Prince:1, Princess:1, Butler:1, Court_Jester:1, High_Priest:1, Chief_Advisor:2, Spy_Master:1, Guard:1});
versionMap.set('alignments', {Chaotic_Good:2, Chaotic_Neutral:1, Chaotic_Evil:2, Neutral_Good:2, True_Neutral:3, Neutral_Evil:3, Lawful_Good:1, Lawful_Neutral:1, Lawful_Evil:1, Unaligned:1})
versionMap.set('answers', {Yes:1, No:1, Ask_Again:1, LOL:1, You_Fool:1, You_ll_Never_Know:1, Fat_Chance:1, Pretty_Sure:1});
versionMap.set('runes', {strength_of_will:1, generosity:1, danger__suffering:1, prosperity__vitality:1, movement__work__growth:1, mortality__pain:1, joy__ecstasy:1, destruction__chaos:1, need__unfulfilled_desire:1, harvest__reward:1, strength__stability:1, protection_from_enemies__defense_of_loved_ones:1, victory__honor:1, fertility__growth__sustenance:1, trust__faith__companionship:1, augmentation__support:1, chaos__potential__the_unknown:1, heritage__tradition__inheritance:1, hope__happiness:1, fertilization__the_beginning_of_something:1})
versionMap.set('emotions', {Disappointment:1, Disgust:1, Jealousy:1, Trust:1, Anger:1, Hate:1, Remorse:1, Awe:1, Acceptance:1, Shock:1, Horror:1, Contempt:1, Sadness:1, Peace:1, Gratitude:1, Joy:1, Worry:1, Anticipation:1, Love:1, Fear:1});

let quadrantMap = new Map();
quadrantMap.set('runes', {B:[], L:[], Z:[], M:[]})


const diceLimit = new Map();
diceLimit.set('4', 4);
diceLimit.set('6', 5);
diceLimit.set('8', 4);
diceLimit.set('10', 2);
diceLimit.set('12', 1);
diceLimit.set('20', 1);
diceLimit.set('math', 1);
diceLimit.set('directions', 1);
diceLimit.set('alignments', 1);
diceLimit.set('royalty', 1);
diceLimit.set('runes', 1);
diceLimit.set('answers', 1);
diceLimit.set('emotions', 1);


let versionArray = [
    [], [], [], [],
    [4, 5, 4, 4,], // 4Dice
    [],
    [5, 5, 5, 5, 5, 5,], // 6Dice
    [],
    [4, 4, 5, 5, 5, 4, 4, 5], // 8Dice
    [],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2,], //10Dice
    [],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], //12 Dice
    [], [], [], [], [], [], [], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 20Dice
]

const typesofdice = [
    "4",
    "6",
    "8",
    "10", 
    "12", 
    "20",
    "alignments",
    "answers",
    "directions",
    "math",
    "runes", 
    "royalty", 
    "emotions",
    "custom"
]



const select = [
    {
        value: "4",
    }, 
    {
        value: "6",
    }, 
    {
        value: "8",
    }, 
    {
        value: "10",
    }, 
    {
        value: "12",
    }, 
    {
        value: "20",
    }, 
    {
        value: 'answers',
    }, 
    {
        value: 'alignments',
    }, 
    {
        value: 'directions',
    }, 
    {
        value: 'math',
    }, 
    {
        value: 'royalty',
    }, 
    {
        value: 'emotions',
    }, 
    {
        value: 'runes',
    }, 
];


const findSides = {
    v4:4,
    v6:6,
    v8:8,
    v10:10,
    v12:12,
    v20:20,
    vmath:4,
    vroyalty:10,
    vrunes:20,
    vanswers:8,
    valignments:10,
    vdirections: 6,
    vemotions: 20,
}



export {typesofdice, valueMap, versionMap, versionArray, select, findSides, diceLimit}