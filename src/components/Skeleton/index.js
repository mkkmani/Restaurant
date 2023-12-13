import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const SkeletonLoading = () => (
  <div className="main-container">
    <div className="badge">
      <Skeleton width={30} height={30} />
    </div>
    <div className="paragraphs">
      <Skeleton count={3} />
    </div>
    <div className="image">
      <Skeleton width={120} height={120} />
    </div>
  </div>
)

const HomeSkeleton = () => {
  const repeatNumber = 6
  const repeatedSkeletons = Array(repeatNumber)
    .fill(null)
    .map(() => <SkeletonLoading key={uuidv4()} />)

  return <div>{repeatedSkeletons}</div>
}

export default HomeSkeleton
