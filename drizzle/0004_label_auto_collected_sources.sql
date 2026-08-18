UPDATE `sources`
SET `kind` = 'AUTO_WEB'
WHERE `kind` = 'WEB'
  AND `url` IN (
    SELECT `url`
    FROM `discovery_candidates`
    WHERE `status` = 'saved'
  );
