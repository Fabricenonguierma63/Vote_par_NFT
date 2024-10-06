const hre = require("hardhat");

async function main() {
    // Déployer le contrat VoteNFT
    const VoteNFT = await hre.ethers.getContractFactory("VoteNFT");
    const voteNFT = await VoteNFT.deploy();
    await voteNFT.deployed();

    console.log("VoteNFT déployé à:", voteNFT.address);

    // Déployer le contrat Voting avec l'adresse du contrat VoteNFT
    const Voting = await hre.ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(voteNFT.address);
    await voting.deployed();

    console.log("Voting déployé à:", voting.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
