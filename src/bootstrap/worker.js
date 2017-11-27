
// get ws domain white list
think.wsDomains = [];
const getWhiteDomains = async () => {
  const domains = await think.model('project').field('domain').where({ status: 1 }).select();
  let wsDomains = (domains || []).map(item => item.domain);
  think.logger.info('ws domain list:', wsDomains)
  think.wsDomains = wsDomains;
}
getWhiteDomains();