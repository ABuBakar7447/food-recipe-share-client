import img1 from '../../Resources/choose.png'

const ChooseWhy = () => {
  return (
    <div>
      <div className='my-24 w-3/4 mx-auto'>
        <div className="flex flex-col lg:flex-row items-end justify-end lg:space-x-4 p-6 relative">
          <div className="absolute inset-0 z-10 left-20 h-[330px] my-auto lg:w-1/2 bg-white shadow-lg rounded-lg p-8 text-center"
          data-aos="fade-right" data-aos-duration="1500">
            <p className="text-yellow-500 text-xl mb-2">Hello Dear</p>
            <h1 className="text-4xl font-bold mb-4">Welcome To Babette</h1>
            <div className="text-yellow-500 mb-4">
              
            </div>
            <p className="text-gray-600 mb-6">
              Babette was the first restaurant to open in Egypt, the restaurant
              was designed with the history in mind we have created a soft
              industrial dining room, combined with an open kitchen, coffee take
              out bar and a lovely awesome on-site coffee roastery...
            </p>
            <p className="text-gray-700 font-signature">Mahmoud Baghagho</p>
          </div>
          <div className="lg:w-1/2 h-[500px] w-full mt-6 lg:mt-0" data-aos="fade-left" data-aos-duration="1500">
            <img
              src={img1}
              alt="Food 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseWhy;
