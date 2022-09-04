const instagram = async (req, res) => {

  // get number of followers from instagram
  // const response = await fetch('https://www.instagram.com/thisUmang/?__a=1');
  // console.log(response);
  // const data = await response.json();
  // const followers = data.graphql.user.edge_followed_by.count;

  // console.log(followers);

    return res.status(200).json({followers: "3K+", posts: 138});
  };
  
  export default instagram;