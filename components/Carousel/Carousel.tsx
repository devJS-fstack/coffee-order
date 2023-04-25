import { Carousel } from 'antd';

const banners = [
    "https://minio.thecoffeehouse.com/image/admin/1681110452_banner-web-cu.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1680286622_banner-web.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1680286925_banner-web-2.jpg",
    "https://minio.thecoffeehouse.com/image/admin/1681404421_banner-web-cu.jpg",
]

const CarouselBanner = () => {
    return (
        <Carousel autoplay={false} className="bg-custom-2">
            {
                banners.map((banner, index) => (
                    <div key={index} className="flex-center py-8">
                        <img src={banner} className="rounded-xl"/>
                    </div>
                ))
            }
        </Carousel>
    )
}

export default CarouselBanner