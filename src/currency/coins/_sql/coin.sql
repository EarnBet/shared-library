CREATE TABLE `coin` (
  `id` int(11) unsigned NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `precision` int(2) NOT NULL,
  `uses_memo_for_deposits` tinyint(1) unsigned NOT NULL,
  `minimum_withdrawal_amount` decimal(20,10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `coin` (`id`,`symbol`,`precision`,`uses_memo_for_deposits`,`minimum_withdrawal_amount`) VALUES (0,'BTC',8,0,0.0001000000),(1,'ETH',8,0,0.0050000000),(2,'EOS',4,1,0.5000000000),(3,'BET',4,1,100.0000000000),(4,'LTC',8,0,0.0100000000),(5,'XRP',6,1,21.0000000000),(6,'BCH',8,0,0.0030000000),(7,'BNB',8,1,0.0100000000),(8,'WAX',8,1,0.0000000000),(9,'TRX',6,0,50.0000000000),(10,'LINK',8,0,1.0000000000),(11,'BET_ETH',4,0,100.0000000000),(12,'DAI',8,0,10.0000000000),(13,'USDC',6,0,10.0000000000),(14,'USDT',6,0,10.0000000000),(15,'STACK',18,0,1.0000000000);