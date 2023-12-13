import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'

export const HomeSkeleton = () => (
  <div className="main-skeleton">
    <div>
      <Skeleton width={30} height={30} />
    </div>
    <div>
      <Skeleton count={3} />
    </div>
    <Skeleton width={60} height={60} />
  </div>
)

export default HomeSkeleton
