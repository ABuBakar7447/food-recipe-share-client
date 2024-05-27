const BuyCoin = () => {

  return (
    <div className="grid grid-cols-3 gap-5 w-3/4 mx-auto py-24">
      <div className="card w-[250px] h-[250px] rounded-2xl text-white font-bold bg-blue-600">
          <div className="card-body items-center text-center">
            <h2 className="card-title">100 coin</h2>
            <p>$1 dollar</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-ghost">Deny</button>
            </div>
          </div>
        </div>

      <div className="card w-[250px] h-[250px] rounded-2xl text-white font-bold bg-orange-600">
          <div className="card-body items-center text-center">
            <h2 className="card-title">500 coin</h2>
            <p>$5 dollar</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-ghost">Deny</button>
            </div>
          </div>
        </div>

      <div className="card w-[250px] h-[250px] rounded-2xl text-white font-bold bg-green-600">
          <div className="card-body items-center text-center">
            <h2 className="card-title">1000 coin</h2>
            <p>$10 dollar</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-ghost">Deny</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default BuyCoin;
