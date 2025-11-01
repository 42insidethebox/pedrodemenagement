const googlePlay = new Proxy({"src":"/_astro/google-play.ISTMcpLO.png","width":300,"height":89,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/pedroribeiro/iCloud Drive (Archive)/Documents/Coding/JS/monwebsite_factory/tonwebsite_ch/tonwebsite/src/assets/images/google-play.png";
							}
							
							return target[name];
						}
					});

export { googlePlay as default };
