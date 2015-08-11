import xmltodict

class JiraFields(object):
	def __init__(self,jiraFieldsFilePath):
		self.fields = dict()
		with open(jiraFieldsFilePath,'r') as f:
			raw_field = f.read()
			fields = xmltodict.parse(raw_field)
			fieldlist = fields['RECORD']['field']
			for field in fieldlist:
				self.fields[field['dbfield']] = field['fieldname']
			print self.fields
