document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const verifyButton = document.getElementById('verifyButton');
    const voteButton = document.getElementById('voteButton');
    const statusDiv = document.getElementById('status');
    const voteStatusDiv = document.getElementById('voteStatus');
    const verificationPage = document.getElementById('verificationPage');
    const votingPage = document.getElementById('votingPage');

    let userAddress;  // Variable pour stocker l'adresse de l'utilisateur
    const nftContractAddress = '0xYourNFTContractAddress';  // Remplace par l'adresse de ton contrat NFT
    const votingContractAddress = '0xYourVotingContractAddress'; // Remplace par l'adresse de ton contrat de vote
    const nftTokenId = '1';  // Remplace par l'ID de ton NFT

    // Connexion au portefeuille avec MetaMask
    connectButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            statusDiv.textContent = "Connexion au portefeuille en cours...";
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                userAddress = accounts[0];
                statusDiv.textContent = "Portefeuille connecté avec succès !";
                verifyButton.disabled = false;  // Activer le bouton de vérification
            } catch (error) {
                statusDiv.textContent = "Échec de la connexion au portefeuille.";
                console.error(error);
            }
        } else {
            statusDiv.textContent = "Veuillez installer MetaMask.";
        }
    });

    // Vérification du NFT
    verifyButton.addEventListener('click', async () => {
        if (!userAddress) {
            statusDiv.textContent = "Veuillez d'abord connecter votre portefeuille.";
            return;
        }

        statusDiv.textContent = "Vérification du NFT en cours...";

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const nftContract = new ethers.Contract(nftContractAddress, [
                'function ownerOf(uint256 tokenId) view returns (address)',
            ], provider);

            const owner = await nftContract.ownerOf(nftTokenId);
            if (owner.toLowerCase() === userAddress.toLowerCase()) {
                statusDiv.textContent = "NFT vérifié avec succès !";
                redirectToVotingPage();  // Rediriger vers la page de vote
            } else {
                statusDiv.textContent = "Vous ne possédez pas ce NFT.";
            }
        } catch (error) {
            statusDiv.textContent = "Échec de la vérification du NFT.";
            console.error(error);
        }
    });

    // Gestion du formulaire de vote
    voteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        voteStatusDiv.textContent = "Votre vote est en cours d'enregistrement...";

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const votingContract = new ethers.Contract(votingContractAddress, [
                'function verifyAndVote(uint256 tokenId)',
            ], signer);

            const tx = await votingContract.verifyAndVote(nftTokenId);
            await tx.wait();
            voteStatusDiv.textContent = "Votre vote a été enregistré avec succès !";
        } catch (error) {
            voteStatusDiv.textContent = "Échec de l'enregistrement du vote.";
            console.error(error);
        }
    });

    // Fonction pour rediriger vers la page de vote après la vérification du NFT
    function redirectToVotingPage() {
        verificationPage.classList.add('hidden');
        votingPage.classList.remove('hidden');
    }
});
