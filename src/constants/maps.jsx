import flood from '../assets/flooded-house.png';
import roadcrack from '../assets/road.png';
import roadbarrier from '../assets/road-barrier.png';
import accident from '../assets/fender-bender.png';
import fire from '../assets/fire.png';
import tree from '../assets/tree.png';
import crowd from '../assets/crowd.png';
import power from '../assets/power.png';

const IncidentIcons = {
  flood: (props) => <img src={flood} alt="flood" {...props} />,
  pothole: (props) => <img src={roadcrack} alt="pothole" {...props} />,
  powercut: (props) => <img src={power} alt="powercut" {...props} />,
  roadblock: (props) => <img src={roadbarrier} alt="roadblock" {...props} />,
  accident: (props) => <img src={accident} alt="accident" {...props} />,
  fire: (props) => <img src={fire} alt="fire" {...props} />,
  flashmob: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/4218/4218741.png" alt="flashmob" {...props} />
  ),
  garbage: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/2713/2713412.png" alt="garbage" {...props} />
  ),
  treefall: (props) => <img src={tree} alt="treefall" {...props} />,
  stampede: (props) => <img src={crowd} alt="stampede" {...props} />,
  other: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="other" {...props} />
  ),
  concert: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" alt="concert" {...props} />
  ),
  cricketmatch: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
      alt="cricket match"
      {...props}
    />
  ),
  footballmatch: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/861/861512.png"
      alt="football match"
      {...props}
    />
  ),
  marathon: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/3550/3550897.png" alt="marathon" {...props} />
  ),
  protest: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/3540/3540930.png" alt="protest" {...props} />
  ),
  politicalrally: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3540/3540930.png"
      alt="political rally"
      {...props}
    />
  ),
  foodfestival: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
      alt="food festival"
      {...props}
    />
  ),
  bookfair: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/3145/3145765.png" alt="book fair" {...props} />
  ),
  artexhibition: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2620/2620970.png"
      alt="art exhibition"
      {...props}
    />
  ),
  theatreplay: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3043/3043871.png"
      alt="theatre play"
      {...props}
    />
  ),
  moviescreening: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
      alt="movie screening"
      {...props}
    />
  ),
  workshop: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/2645/2645852.png" alt="workshop" {...props} />
  ),
  seminar: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/3039/3039434.png" alt="seminar" {...props} />
  ),
  conference: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3039/3039434.png"
      alt="conference"
      {...props}
    />
  ),
  techmeetup: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3064/3064428.png"
      alt="tech meetup"
      {...props}
    />
  ),
  hackathon: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/3064/3064428.png" alt="hackathon" {...props} />
  ),
  blooddonationcamp: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
      alt="blood donation"
      {...props}
    />
  ),
  healthcamp: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
      alt="health camp"
      {...props}
    />
  ),
  freevaccinationdrive: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
      alt="vaccination"
      {...props}
    />
  ),
  lostfound: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/483/483947.png"
      alt="lost and found"
      {...props}
    />
  ),
  animalrescue: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
      alt="animal rescue"
      {...props}
    />
  ),
  waterlogging: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
      alt="water logging"
      {...props}
    />
  ),
  trafficjam: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/201/201818.png" alt="traffic jam" {...props} />
  ),
  metrodisruption: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
      alt="metro disruption"
      {...props}
    />
  ),
  publictransportstrike: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
      alt="transport strike"
      {...props}
    />
  ),
  streetperformance: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3540/3540930.png"
      alt="street performance"
      {...props}
    />
  ),
  culturalfestival: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/5110/5110992.png"
      alt="cultural festival"
      {...props}
    />
  ),
  religiousprocession: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/1023/1023656.png"
      alt="religious procession"
      {...props}
    />
  ),
  ganeshvisarjan: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/1023/1023656.png"
      alt="ganesh visarjan"
      {...props}
    />
  ),
  holicelebration: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/535/535241.png" alt="holi" {...props} />
  ),
  diwalifireworks: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/535/535234.png" alt="diwali" {...props} />
  ),
  christmasparade: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="christmas" {...props} />
  ),
  newyearevent: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="new year" {...props} />
  ),
  potteryfair: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/201/201714.png"
      alt="pottery fair"
      {...props}
    />
  ),
  craftfair: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/201/201714.png" alt="craft fair" {...props} />
  ),
  farmersmarket: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2909/2909769.png"
      alt="farmers market"
      {...props}
    />
  ),
  carshow: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/743/743922.png" alt="car show" {...props} />
  ),
  bikerally: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/743/743922.png" alt="bike rally" {...props} />
  ),
  charityrun: (props) => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
      alt="charity run"
      {...props}
    />
  ),
  default: (props) => (
    <img src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png" alt="default" {...props} />
  ),
};

export default IncidentIcons;
