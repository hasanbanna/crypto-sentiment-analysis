let sentiment = require('sentiment');

let a = ["Substratum builds the decentralized web by leveraging the power of the individual. Anyone can publish, anyone can participate, and everyone is welcome to browse.",
"Because there's no single authority delivering or monitoring content, censorship and geo-restricted sites won't be an issue on the decentralized web. It doesn't matter where you live or what content you're accessing, everyone in the world sees the exact same content. Net neutrality laws threaten to regulate internet access by charging higher rates for viewing certain content. All sites are treated the same on the decentralized web, allowing users to enjoy the full online experience without lining the pockets of internet service providers."]
let averageScore = 0;
for(let i = 0; i < a.length; i++){  
  console.log("positive: ", sentiment(a[i]).positive);
  console.log("negative: ", sentiment(a[i]).negative);
  averageScore += sentiment(a[i]).score;
}
console.log("average score: ", averageScore / a.length);