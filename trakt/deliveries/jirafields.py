import xmltodict

class JiraFields(object):
	def __init__(self,jiraFieldsFilePath, defectFilePath):
		customFields = dict()
		with open(jiraFieldsFilePath,'r') as f:
			rawCustomFields = f.read()
			parse = xmltodict.parse(rawCustomFields)
			fields = parse['RECORD']['field']
			for field in fields:
				customFields[field['dbfield']] = field['fieldname']

		with open(defectFilePath,'r') as f:
			rawDefect = f.read()
			parse = xmltodict.parse(rawDefect)
			defectFields = parse['RECORD']

		self.defectCleaned = dict()
		for key,value in defectFields.iteritems():
			 try:
			 	self.defectCleaned[customFields[key]] = value
			 except:
			 	if not key.startswith('customfield'):
				 	self.defectCleaned[key] = value
