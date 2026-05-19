import jflix from './images/jflix-optimized.jpg';
import portfolio from './images/myport-optimized.jpg';
import ssc from './images/ssc-optimized.jpg';
import tpc from './images/tpc mock.jpg';
import projectItems from '../data/projects';

const imageMap = {
  ssc,
  tpc,
  portfolio,
  jflix
};

const items = projectItems.map((item) => ({
  ...item,
  image: imageMap[item.imageKey]
}));

export default items;
