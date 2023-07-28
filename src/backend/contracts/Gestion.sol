// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ModeloNFT.sol";

contract Gestion {
    mapping(uint256 => address) private id_creators;

    mapping(uint256 => address) private id_seller;

    mapping(uint256 => address) private id_admins;
    mapping(address => bool) private admin_bol;
    mapping(address => bool) private creator_bol;
    mapping(address => bool) private seller_bol;

    address owner;

    mapping(uint256 => address) public id_nft;

    mapping(address => uint256[]) public employer_creation;

    event NewWatch(address indexed employer, uint256 watch_id);

    modifier onlyOwner() {
        require(
            msg.sender == owner        );
        _;
    }

    modifier onlyCreator(uint256 id) {
        require(
            id_creators[id] == msg.sender
        );
        _;
    }
    modifier onlySeller(uint256 id) {
        require(id_seller[id] == msg.sender);
        _;
    }

    modifier onlyAdminOwner(uint256 id) {
        require(
            id_admins[id] == msg.sender || msg.sender == owner
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function isAdmin() public view returns (bool) {
        return admin_bol[msg.sender];
    }

    function isSeller() public view returns (bool) {
        return seller_bol[msg.sender];
    }

    function isCreator() public view returns (bool) {
        return creator_bol[msg.sender];
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function addAdmin(
        uint256 id,
        uint256 newid,
        address newAdmin
    ) public onlyAdminOwner(id) {
        id_admins[newid] = newAdmin;
        id_creators[newid] = newAdmin;
        id_seller[newid] = newAdmin;
        admin_bol[newAdmin] = true;
    }

    function removeadmin(uint256 idAdmin) public onlyOwner {
        admin_bol[id_admins[idAdmin]]=false;
        delete id_admins[idAdmin];
        delete id_creators[idAdmin];
        delete id_seller[idAdmin];
    }

    function addCreator(
        uint256 idAdmin,
        uint256 idCreator,
        address creator
    ) public onlyAdminOwner(idAdmin) {
        id_creators[idCreator] = creator;
        creator_bol[creator]=true;
    }

    function removeCreator(
        uint256 idAdmin,
        uint256 idCreator
    ) public onlyAdminOwner(idAdmin) {
        creator_bol[id_creators[idCreator]]=false;
        delete id_creators[idCreator];
    }

    function addSeller(
        uint256 idAdmin,
        uint256 idSeller,
        address seller
    ) public onlyAdminOwner(idAdmin) {
        id_seller[idSeller] = seller;
        seller_bol[seller]=true;
    }

    function removeSeller(
        uint256 idAdmin,
        uint256 idSeller
    ) public onlyAdminOwner(idAdmin) {
        seller_bol[id_seller[idSeller]]=false;
        delete id_seller[idSeller];
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getSeller(
        uint256 idConsult,
        uint256 idSeller
    ) public view onlyAdminOwner(idConsult) returns (address) {
        return id_seller[idSeller];
    }

    function crearReloj(
        uint256 idCreator,
        uint256 serialNumber,
        string memory dateCreation,
        string[] memory metrials,
        string memory fp,
        string memory image,
        string memory video
    ) public onlyCreator(idCreator) {
        require(msg.sender == id_creators[idCreator]);
        address addr_watch = address(new CWNFT(address(this)));
        id_nft[serialNumber] = addr_watch;
        CWNFT cwnft = CWNFT(addr_watch);
        cwnft.createWatch(serialNumber,dateCreation, metrials, fp, owner,image,video);
        employer_creation[msg.sender].push(serialNumber);
        emit NewWatch(msg.sender, serialNumber);
    }

    function Firstsell(
        uint256 serialNumber,
        address to,
        uint256 idSeller
    ) public onlySeller(idSeller) {
        require(msg.sender == id_seller[idSeller]);
        require(to!=msg.sender,"You can transfer thw watch to your self");
        CWNFT cwnft = CWNFT(id_nft[serialNumber]);
        cwnft.firstSell(serialNumber, msg.sender, to);
    }
}
