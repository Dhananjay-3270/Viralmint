const indianCities = [
    { city: "Mumbai", country: "India" },
    { city: "Delhi", country: "India" },
    { city: "Bangalore", country: "India" },
    { city: "Hyderabad", country: "India" },
    { city: "Chennai", country: "India" },
    { city: "Kolkata", country: "India" },
    { city: "Ahmedabad", country: "India" },
    { city: "Pune", country: "India" },
    { city: "Surat", country: "India" },
    { city: "Jaipur", country: "India" },
    { city: "Lucknow", country: "India" },
    { city: "Kanpur", country: "India" },
    { city: "Nagpur", country: "India" },
    { city: "Indore", country: "India" },
    { city: "Thane", country: "India" },
    { city: "Bhopal", country: "India" },
    { city: "Visakhapatnam", country: "India" },
    { city: "Patna", country: "India" },
    { city: "Vadodara", country: "India" },
    { city: "Ghaziabad", country: "India" },
    { city: "Coimbatore", country: "India" },
    { city: "Kochi", country: "India" },
    { city: "Mysore", country: "India" },
    { city: "Vijayawada", country: "India" },
    { city: "Madurai", country: "India" },
    { city: "Nashik", country: "India" },
    { city: "Rajkot", country: "India" },
    { city: "Jabalpur", country: "India" },
    { city: "Udaipur", country: "India" },
    { city: "Agra", country: "India" },
    { city: "Varanasi", country: "India" },
    { city: "Guwahati", country: "India" },
    { city: "Dehradun", country: "India" },
    { city: "Jamshedpur", country: "India" },
    { city: "Ranchi", country: "India" },
    { city: "Chandigarh", country: "India" },
    { city: "Shimla", country: "India" },
    { city: "Goa", country: "India" },
    { city: "Puducherry", country: "India" },
    { city: "Trivandrum", country: "India" },
    { city: "Amritsar", country: "India" },
    { city: "Ludhiana", country: "India" },
    { city: "Meerut", country: "India" },
    { city: "Aurangabad", country: "India" },
    { city: "Allahabad", country: "India" },
    { city: "Mangalore", country: "India" },
    { city: "Tiruchirappalli", country: "India" },
  ];
  
  const titles = [
    "Exploring the Streets of",
    "Tech Startups in",
    "The Best Street Food in",
    "A Journey Through",
    "Life in",
    "The Hidden Gems of",
    "The Booming Economy in",
    "An Adventure in",
    "What Makes People Love",
    "The Growing Appeal of"
  ];
  
  const contents = [
    "An in-depth guide to the culture and lifestyle of",
    "Learn about the latest trends and innovations happening in",
    "Discover the must-visit places and experiences in",
    "Explore the local cuisine, attractions, and more in",
    "Uncover why digital nomads and tourists flock to",
    "A detailed travel and living guide to",
    "Everything you need to know about the hidden beauty of",
    "Find out how this city is becoming a global tech hub",
    "Experience the vibrant culture and unique offerings of",
    "A comprehensive look at the modern developments in"
  ];
  
  // Function to generate mock blog posts
  function generateBlogPosts(num) {
    const blogPosts = [];
    const allCities = [...indianCities]; // Prioritize Indian cities
  
    for (let i = 1; i <= num; i++) {
      const randomCity = allCities[Math.floor(Math.random() * allCities.length)];
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomContent = contents[Math.floor(Math.random() * contents.length)];
  
      blogPosts.push({
        id: i,
        title: `${randomTitle} ${randomCity.city}`,
        content: `${randomContent} ${randomCity.city}, ${randomCity.country}.`,
        city: randomCity.city,
        country: randomCity.country,
        media: [
          {
            type: "image",
            url: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg",
          },
          {
            type: "video",
            url: "https://videos.pexels.com/video-files/1851768/1851768-uhd_2560_1440_30fps.mp4",
          }
        ]
      });
    }
  
    return blogPosts;
  }

  export const blogPosts = generateBlogPosts(10);
  

  