const VoteNFT = artifacts.require("VoteNFT");
const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  // Déployer le contrat VoteNFT
  await deployer.deploy(VoteNFT);
  const voteNFT = await VoteNFT.deployed();

  // Déployer le contrat Voting avec l'adresse du contrat VoteNFT
  await deployer.deploy(Voting, voteNFT.address);
};
